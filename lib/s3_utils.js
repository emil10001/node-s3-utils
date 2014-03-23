/**
 * Created by ejf3 on 12/29/13.
 * Some examples taken from: http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html#Amazon_Simple_Storage_Service__Amazon_S3_
 */
var AWS = require('aws-sdk')
    , crypto = require('crypto')
    , qs = require('querystring');

// constants
var S3_GET_URLPAIR = 's3_get_urlpair',
    S3_GET_URL = 's3_get_url',
    S3_PUT_URL = 's3_put_url',
    S3_KEY = 's3_key',
    S3_DELETE = 's3_delete',
    ERROR = 'error',
    SUCCESS = 'success';


/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='AKID'
 * export AWS_SECRET_ACCESS_KEY='SECRET'
 */
AWS.config.region = "us-east-1";
AWS.config.apiVersions = {
    s3: '2006-03-01'
};

S3Utils = function (bucket) {
    var s3 = new AWS.S3();
    var self = this;

    this.listBuckets = function () {
        s3.listBuckets(function (err, data) {
            for (var index in data.Buckets) {
                var bucket = data.Buckets[index];
                console.log("Bucket: ", bucket);
            }
        });
    };

    this.generateUrlPair = function (callback) {
        this.generateTempUrlPair(null, callback);
    };

    this.generateTempUrlPair = function (expDate, callback) {
        this.generateListUrlPairs([],1,expDate,function(urlPairs){
            callback(urlPairs[0]);
        });
    };

    this.generateListUrlPairs = function(pairCount, expDate, callback) {
        privateGenerateListUrlPairs([], pairCount, expDate, callback);
    };

    function privateGenerateListUrlPairs (urlPairs, pairCount, expDate, callback){
        if (null == urlPairs)
            urlPairs = [];
        var urlPair = {};
        var key = crypto.createHash('sha1').update(new Date().getTime().toString() + Math.random().toString()).digest('base64').toString();
        key = qs.escape(key);
        console.log('requesting url pair for', key);
        urlPair[S3_KEY] = key;
        var putParams = {Bucket: bucket, Key: key, ACL: "public-read", ContentType: "application/octet-stream" };
        if (!!expDate)
            putParams["Expires"] = expDate;

        s3.getSignedUrl('putObject', putParams, function (err, url) {
            if (!!err) {
                console.error(S3_GET_URLPAIR, err);
                callback(null, err);
                return;
            }
            urlPair[S3_PUT_URL] = url;
            urlPair[S3_GET_URL] = "https://aws-node-demos.s3.amazonaws.com/" + qs.escape(key);

            urlPairs.push(urlPair);

            if (urlPairs.length >= pairCount)
                callback(urlPairs);
            else
                privateGenerateListUrlPairs(urlPairs, pairCount, expDate, callback);
        });
    }


    this.deleteMedia = function (key, callback) {
        var params = {Bucket: bucket, Key: key};
        console.log(S3_DELETE, params);
        s3.deleteObject(params, function (err, data) {
            if (!!err) {
                console.error(S3_DELETE, err);
                callback(null, err);
                return;
            }
            console.log(S3_DELETE, data);
            callback(data);
        });
    };
};

module.exports = S3Utils;