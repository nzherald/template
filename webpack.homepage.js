// Generates embed.js and deploys to homepage
// Configs
const { merge } = require("webpack-merge")
const base = require("./webpack.prod.js")
// Tools
const AWS = require("aws-sdk")
// Plugins
const EmbedPlugin = require("./util/embedgen.js")
const S3Plugin = require("webpack-s3-plugin")

const host = "https://insights.nzherald.co.nz"
const path = "/apps/homepagebanner/"
const s3Options = {
    credentials: new AWS.SharedIniFileCredentials({ profile: "nzherald" }),
    region: "ap-southeast-2"
}

module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({
            funcName: "DataVisDevMain",
            targName: "#nzh-datavis-root",
            basePath: host + path
        }),
        new S3Plugin({
            exclude: /^(embed.js|embed.css|.*\.html)$/i,
            basePath: path,
            s3Options : s3Options,
            s3UploadOptions : {
                Bucket : "s3.newsapps.nz",
                CacheControl: "max-age=2592000,public"
            }
        }),
        new S3Plugin({
            include: /^(embed.js|embed.css|.*\.html)$/i,
            basePath: path,
            s3Options : s3Options,
            s3UploadOptions : {
                Bucket : "s3.newsapps.nz",
                CacheControl: "max-age=60,public"
            }
        })
    ]
})
