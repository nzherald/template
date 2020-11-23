// Post-processing and minification of bundle
// Configs
const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const { homepage, name } = require("../package.json")
// Tools
const path = require("path")
// Plugins
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(base, {
    mode: "production",
    output: {
        filename: "[name].prod.[chunkhash].js",
        publicPath: homepage
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
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
                    "css-loader",
                    "postcss-loader",
                ]
            },
            {
                test: /\.(js|es6)$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules|bower_components)/,
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            ENV: JSON.stringify({
                name: name,
                path: homepage,
                isProduction: true,
                isDevelopment: false
            })
        }),
        new MiniCssExtractPlugin({
            filename: "[name].prod.[chunkhash].css"
        })
    ]
})
