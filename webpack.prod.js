const webpack  = require('webpack')
const merge    = require('webpack-merge')
const common   = require('./webpack.common.js')
const AWS      = require('aws-sdk')
const S3Plugin = require('webpack-s3-uploader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AWS_CONFIG = {
    profile: 'nzherald',
    bucket : 's3.newsapps.nz',
    region : 'ap-southeast-2'
}


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new S3Plugin({
            basePath  : common.output.publicPath  !== "/" ? common.output.publicPath : /[^\/]*$/.exec(process.env.PWD)[0],
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
        })
    ]
})
