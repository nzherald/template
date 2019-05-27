const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const EmbedPlugin = require("./util/embed.js")
const {smallUploader, largeUploader} = require("./util/uploader")
const package = require("./package.json")

// Generates embed.js and deploys to https://insights.nzherald.co.nz/app/livetest
// View on the dedicated test page https://www.nzherald.co.nz/business/news/article.cfm?c_id=3&objectid=12234834
const host = "https://insights.nzherald.co.nz",
      path = "/apps/livetest/"
module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({basePath: host + path}),
        largeUploader({basePath: path}),
        smallUploader({basePath: path})
    ]
})
