const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const url = require("url")
const EmbedPlugin = require("./util/embedgen.js")
const { homepage } = require("./package.json")

// Delete this if you know what you're doing
if (homepage.indexOf("https://insights.nzherald.co.nz/apps/") === -1) {
    throw "YO! I'm supposed to release using the homepage property in packages, " +
          "but this doesn't look like a https://insights.nzherald.co.nz/apps address. DYING NOW."
}

module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({
            basePath: homepage
        }),
    ]
})
