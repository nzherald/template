const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")
const { homepage } = require("./package.json")

// Post-processing and minification of bundle
module.exports = merge(base, {
    resolve: {
        alias: {
            Environment$: path.resolve(__dirname, "util/production.js")
        }
    },
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
        new MiniCssExtractPlugin({
            filename: "[name].prod.[chunkhash].css"
        })
    ]
})
