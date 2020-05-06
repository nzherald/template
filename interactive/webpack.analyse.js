const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const EmbedPlugin = require("./util/embedgen.js")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

// Runs analysis on processed/minified bundle
module.exports = merge(base, {
    mode: "production",
    plugins: [
        new EmbedPlugin({basePath: ""}),
        new BundleAnalyzerPlugin()
    ]
})
