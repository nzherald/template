const merge = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const EmbedPlugin = require("./util/embedgen.js")
const Dotenv = require('dotenv-webpack');

// Spins up dev server with bundles using minimal template
module.exports = merge(base, {
    resolve: {
        alias: {
            Environment$: path.resolve(__dirname, "util/development.js")
        }
    },
    mode: "development",
    output: {
        filename: "[name].dev.[hash].js"
    },
    devServer: {
        contentBase: ["./static", "./static-dev"]
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
            },
            {
                test: /\.(js|es6)$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules|bower_components)/,
                query: {
                    plugins: ["@babel/transform-runtime", "@babel/proposal-object-rest-spread"],
                    presets: ["@babel/env", "@babel/preset-react"],
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].dev.[chunkhash].css"
        }),
        new EmbedPlugin({
            basePath: ""
        }),
        new Dotenv({path: ".env.dev"})
    ]
})
