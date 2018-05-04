const webpack  = require('webpack')
const merge    = require('webpack-merge')
const common   = require('./webpack.common.js')
const AWS      = require('aws-sdk')
const S3Plugin = require('webpack-s3-uploader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AWS_CONFIG = {
    profile : 'nzherald',
    bucket  : 's3.newsapps.nz',
    region  : 'ap-southeast-2'
}


module.exports = merge(common, {
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        }),
        new S3Plugin({
            include   : /.*\.(css|js)/,
            basePath  : /[^\/]*$/.exec(process.env.PWD)[0],
            s3Options : {
                credentials : new AWS.SharedIniFileCredentials({ profile : AWS_CONFIG.profile }),
                region      : AWS_CONFIG.region
            },
            s3UploadOptions : {
                Bucket  : AWS_CONFIG.bucket
            }
        })
    ]
})
