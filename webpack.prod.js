const merge  = require('webpack-merge')
const common = require('./webpack.common.js')

const S3Plugin = require('webpack-s3-plugin')
const appName  = /[^\/]*$/.exec(process.env.PWD)[0]

module.exports = merge(common, {
  plugins: [
    new S3Plugin({
      include   : /.*\.(css|js)/,
      basePath  : appName,
      s3Options : {
        accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
        region          : 'us-west-2'
      },
      s3UploadOptions : {
        Bucket: 'nzherald.test'
      }
    })
  ]
})
