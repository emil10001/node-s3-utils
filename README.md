NodeJS S3 Utils
==========================

WARNING: This is not a stable package. I have not finalized the API,
so consider it subject to change. Luckily, it's a very small code-base,
so you should be able to read it and fork it if necessary.

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
    s3.generateTempUrlPair(TWO_WEEKS, function(urlPair){
        console.log(urlPair);
    });

Note: AWS S3 expects a date offset tin seconds, not miliseconds, and not a future date.

To get a list of multiple URL pairs:

        var TWO_WEEKS = 7 * 24 * 60 * 60;
        s3.generateListUrlPairs(5, TWO_WEEKS, function(urlPairs){
            console.log(urlPairs);
        });

Deleting media from your S3 bucket:

    s3.deleteMedia(key, success);

Or just list your buckets:

    s3.listBuckets();
