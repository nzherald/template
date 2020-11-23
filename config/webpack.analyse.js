// Runs analysis on processed/minified bundle
// Configs
const { merge } = require("webpack-merge")
const base = require("./webpack.prod.js")
// Plugins
const EmbedPlugin = require("../util/embedgen.js")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({ basePath: "" }),
        new BundleAnalyzerPlugin()
    ]
})
