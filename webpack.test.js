const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

// Runs analysis on processed/minified bundle
module.exports = merge(base, {
    mode: "production",
    plugins: [
        new UglifyJsPlugin(),
        new BundleAnalyzerPlugin()
    ]
})
