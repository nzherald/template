const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const EmbedPlugin = require("./util/embedgen.js")
const { uncachedUploader, cachedUploader } = require("./util/uploader")

// Generates embed.js and deploys to https://insights.nzherald.co.nz/app/livetest[arg]
// e.g. npm run livetest -> deploys to https://insights.nzherald.co.nz/app/livetest
//      npm run livetest -- --env=bob -> deploys to https://insights.nzherald.co.nz/app/livetest-bob
const args = process.argv
const i = args.indexOf("webpack.livetest.js")

let subpath = ""
process.argv.forEach(v => {
    if (v.substr(0, 6) === "--env=") {
        subpath = "-" + v.substr(6)
    }
})

const host = "https://insights.nzherald.co.nz"
const path = "/apps/livetest" + subpath + "/"

module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({
            basePath: host + path
        }),
        uncachedUploader({
            basePath: path
        })
    ]
})
