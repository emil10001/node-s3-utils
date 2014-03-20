NodeJS S3 Utils
==========================

This is a helper utility library for AWS S3, the main purpose of
this library is to generate a URL pair.


    var s3Util = require('s3-utils');
    var s3 = new s3Util('your_bucket');
    var urlPair = s3.generateUrlPair(success);
    /**
        urlPair: {
            s3_key: "key",
            s3_put_url: "some_long_private_url",
            s3_get_url: "some_shorter_public_url"
        }
    */

Deleting media from your S3 bucket:

    s3.deleteMedia(key, success);

Or just list your buckets:

    s3.listBuckets();
