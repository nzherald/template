const merge = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")

// Post-processing and minification of bundle
module.exports = merge(base, {
    mode: "production",
    output: {
        filename: "[name].bundle.[hash].js",
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
                    plugins: ["transform-runtime"],
                    presets: ["env"],
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css"
        })
    ]
})
