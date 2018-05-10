const S3Plugin = require('webpack-s3-uploader')
const AWS      = require('aws-sdk')
const AWS_CONFIG = {
    profile: 'nzherald',
    bucket : 's3.newsapps.nz',
    region : 'ap-southeast-2'
}

function uploader(config) {
    return new S3Plugin({
        basePath  : config.output.publicPath  !== "/" ? config.output.publicPath : /[^\/]*$/.exec(process.env.PWD)[0],
        s3Options : {
            credentials : new AWS.SharedIniFileCredentials({ profile : AWS_CONFIG.profile }),
            region      : AWS_CONFIG.region
        },
        s3UploadOptions : {
            Bucket  : AWS_CONFIG.bucket,
            CacheControl(fileName) {
                if (/.html/.test(fileName) || /embed.*/.test(fileName))
                    return "max-age=60,public"
                else
                    return "max-age=2592000,public"
            }
        },
    });
}

module.exports = uploader;
