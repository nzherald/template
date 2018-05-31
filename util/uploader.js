/* uploads files to S3
 *
 * Upload needs to happen in two stages:
 *
 * 1) Upload everything else with a long cache time
 * 2) Upload embed.css, embed.js and index.html with short cache time
 *
 * The reason for this is so that the assets have already been uploaded 
 * prior to updating/uploading the files that reference the assets.
 * If this doens't happen and someone happens to be using the index or
 * embed file prior to uploading the assets a 404 will get cached on the cdn
 * for the asset.
 */

const S3Plugin = require('webpack-s3-uploader')
const AWS      = require('aws-sdk')
const AWS_CONFIG = {
    profile: 'nzherald',
    bucket : 's3.newsapps.nz',
    region : 'ap-southeast-2'
}

function smallUploader(options) {
    return new S3Plugin({
        include : /.*\.html|embed\.(css|js)/,
        basePath  : options.basePath,
        s3Options : {
            credentials : new AWS.SharedIniFileCredentials({ profile : AWS_CONFIG.profile }),
            region      : AWS_CONFIG.region
        },
        s3UploadOptions : {
            Bucket  : AWS_CONFIG.bucket,
            CacheControl(filename) {
                console.log("\nUncached upload of " + filename)
                return "max-age=60,public"
            }
        },
    });
}

function largeUploader(options) {
    console.log("Uploading files to", AWS_CONFIG.bucket + options.basePath + "...")
    return new S3Plugin({
        exclude: /.*\.html|embed\.(css|js)/,
        basePath  : options.basePath,
        s3Options : {
            credentials : new AWS.SharedIniFileCredentials({ profile : AWS_CONFIG.profile }),
            region      : AWS_CONFIG.region
        },
        s3UploadOptions : {
            Bucket  : AWS_CONFIG.bucket,
            CacheControl(filename) {
                console.log("\nCached upload of " + filename)
                return "max-age=2592000,public"
            }
        },
    });
}

module.exports = { smallUploader, largeUploader };
