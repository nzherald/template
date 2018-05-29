const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const url = require("url")
const EmbedPlugin = require("./util/embed.js")
const {smallUploader, largeUploader} = require("./util/uploader")
const package = require("./package.json")

// Delete this if you know what you're doing
if (package.homepage.indexOf("https://insights.nzherald.co.nz/apps/") === -1) {
    throw "YO! I'm supposed to release using the homepage property in packages, " +
          "but this doesn't look like a https://insights.nzherald.co.nz/apps address. DYING NOW."
}
// Generates embed.js and deploys to package.homepage
const host = "https://insights.nzherald.co.nz",
      path = url.parse(package.homepage).pathname
module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({basePath: host + path}),
        largeUploader({basePath: path}),
        smallUploader({basePath: path})
    ]
})
