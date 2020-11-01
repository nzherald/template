const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const EmbedPlugin = require("./util/embedgen.js")
const { getPort } = require('portfinder-sync')
const { name } = require('./package.json')

const port = getPort(8080)
// Spins up dev server with bundles using minimal template
module.exports = merge(base, {
    resolve: {
        alias: {
            Environment$: path.resolve(__dirname, "util/development.js")
        }
    },
    mode: "development",
    output: {
        filename: "[name].dev.[contenthash].js",
        publicPath: "/"
    },
    devServer: {
        contentBase: ["./static", "./.nzh-rip"],
        open: true,
        port
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].dev.[chunkhash].css"
        }),
        new EmbedPlugin({ name, basePath: "" })
    ]
})
