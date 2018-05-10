const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const uploader = require("./util/uploader")


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        uploader(common)
    ]
})
