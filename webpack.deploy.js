const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const EmbedPlugin = require("./util/embedgen.js")
const {smallUploader, largeUploader} = require("./util/uploader")
const package = require("./package.json")
const CopyWebpackPlugin = require("copy-webpack-plugin")

// Generates embed.js and deploys to s3.newsapps.nz/dev/[package name]/
const host = "http://s3.newsapps.nz",
      path = "/dev/" + package.name + "/"
module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({basePath: host + path}),
        largeUploader({basePath: path}),
        smallUploader({basePath: path}),
        new CopyWebpackPlugin(["static-dev"])
    ]
})
