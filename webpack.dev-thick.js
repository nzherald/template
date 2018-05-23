const merge = require("webpack-merge")
const base = require("./webpack.dev.js")

// Spins up dev server with bundles using nzherald.co.nz template
module.exports = merge(base, {
    devServer: {
        contentBase: "./static-thick"
    }
})
