const merge = require("webpack-merge")
const base = require("./webpack.common.js")

// Spins up dev server with bundles
module.exports = merge(base, {
    mode: "development",
    devServer: {
        contentBase: "./dist",
        port: 8080
    }
})
