const merge = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")
const CopyWebpackPlugin = require("copy-webpack-plugin")

// Post-processing and minification of bundle
module.exports = merge(base, {
    mode: "production",
    output: {
        filename: "[name].prod.[chunkhash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer({browsers: "last 2 versions"})]
                        }
                    },
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer({browsers: "last 2 versions"})]
                        }
                    }
                ]
            },
            {
                test: /\.(js|es6)$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules|bower_components)/,
                query: {
                    plugins: ["transform-runtime", "transform-object-rest-spread"],
                    presets: ["env"],
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin(["static"]),
        new MiniCssExtractPlugin({
            filename: "[name].prod.[chunkhash].css"
        })
    ]
})
