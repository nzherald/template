const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const url = require("url")
const EmbedPlugin = require("./util/embed")
const uploader = require("./util/uploader")
const package = require("./package.json")

// Delete this if you know what you're doing
if (package.homepage.indexOf("s3.newsapps.nz") === -1) {
    throw "YO! I'm supposed to release using the homepage property in packages, " +
          "but this doesn't look like a s3.newsapps.nz address. DYING NOW."
}
// Generates embed.js and deploys to s3.newsapps.nz/[package.homepage pathname]
const host = "http://s3.newsapps.nz",
      path = url.parse(package.homepage).pathname
module.exports = merge(base, {
    mode: "production",
    plugins: [
        new EmbedPlugin({basePath: host + path}),
        uploader({basePath: path})
    ]
})
