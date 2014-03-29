NodeJS S3 Utils
==========================

This is a helper utility library for AWS S3, the main purpose of
this library is to generate a URL pair.


    var s3Util = require('s3-utils');
    var s3 = new s3Util('your_bucket');
    var urlPair = s3.generateUrlPair(function(urlPair){
        console.log("urlPair", urlPair);
    });
    /**
        urlPair: {
            s3_key: "key",
            s3_put_url: "some_long_private_url",
            s3_get_url: "some_shorter_public_url"
        }
    */

To get a URL pair for an object that will expire in two weeks, do the following:

    var TWO_WEEKS = 7 * 24 * 60 * 60;
    var expDate = new Date().getTime() + TWO_WEEKS;
    s3.generateTempUrlPair(expDate, function(urlPair){
        console.log(urlPair);
    });

Note: AWS S3 expects dates to be in seconds, not miliseconds.

To get a list of multiple URL pairs:

        var TWO_WEEKS = 7 * 24 * 60 * 60;
        var expDate = new Date().getTime() + TWO_WEEKS;
        s3.generateListUrlPairs(5, expDate, function(urlPairs){
            console.log(urlPairs);
        });

Deleting media from your S3 bucket:

    s3.deleteMedia(key, success);

Or just list your buckets:

    s3.listBuckets();
