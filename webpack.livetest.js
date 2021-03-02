// Generates embed.js and deploys to https://insights.nzherald.co.nz/app/livetest[arg]
// e.g. npm run livetest -> deploys to https://insights.nzherald.co.nz/app/livetest
//      npm run livetest -- --env=bob -> deploys to https://insights.nzherald.co.nz/app/livetest-bob
// Configs
const { merge } = require("webpack-merge")
const base = require("./webpack.prod.js")
// Tools
const AWS = require("aws-sdk")
// Plugins
const EmbedPlugin = require("./util/embedgen.js")
const S3Plugin = require("webpack-s3-plugin")

let subpath = ""
process.argv.forEach(v => {
    if (v.substr(0, 6) === "--env=") {
        subpath = "-" + v.substr(6)
    }
})

const host = "https://insights.nzherald.co.nz"
const path = "/apps/livetest" + subpath + "/"
const s3Options = {
    credentials: new AWS.SharedIniFileCredentials({ profile: "nzherald" }),
    region: "ap-southeast-2"
}

module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({ basePath: host + path }),
        new S3Plugin({
            exclude: /^(embed.js|embed.css|.*\.html)$/i,
            basePath: path,
            s3Options : s3Options,
            s3UploadOptions : {
                Bucket : "s3.newsapps.nz",
                CacheControl: "max-age=60,public"
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
