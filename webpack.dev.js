// Spins up dev server with bundles using minimal template
// Configs
const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const { homepage, name, config } = require("./package.json")
// Tools
const path = require("path")
const { getPort } = require("portfinder-sync")
// Plugins
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const EmbedPlugin = require("./util/embedgen.js")
const RipNZHPlugin = require("./util/ripnzh.js")

const port = getPort(8080)

module.exports = merge(base, {
    mode: "development",
    output: {
        filename: "[name].dev.[contenthash].js",
        publicPath: "/"
    },
    devServer: {
        contentBase: ["./static-dev", "./static", "./.nzh-rip"],
        open: true,
        port
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: { lessOptions: { globalVars: { projectName: name } } }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new RipNZHPlugin({
            baseURL: "https://www.nzherald.co.nz",
            layout: config.layout,
            dstPath: path.resolve(__dirname, "./.nzh-rip"),
            wrkPath: path.resolve(__dirname, "./util")
        }),
        new DefinePlugin({
            ENV: JSON.stringify({
                name: name,
                path: `http://localhost:${port}`,
                isProduction: false,
                isDevelopment: true
            })
        }),
        new MiniCssExtractPlugin({ filename: "[name].dev.[chunkhash].css" }),
        new EmbedPlugin({ name, basePath: `http://localhost:${port}/` })
    ]
})
