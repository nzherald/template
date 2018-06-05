const merge = require("webpack-merge")
const base = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const EmbedPlugin = require("./util/embed.js")

// Spins up dev server with bundles using minimal template
module.exports = merge(base, {
    mode: "development",
    output: {
        filename: "[name].dev.[hash].js"
    },
    devServer: {
        contentBase: ["./static", "./static-dev"],
        port: 8080
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
        new EmbedPlugin({basePath: ""})
    ]
})
