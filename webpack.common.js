const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        loading: "./src/lib/loading.js",
        root: "./src/root.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // translates CSS into CommonJS
                    "less-loader" // compiles Less to CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            },
            {
                test: /\.(c|d|t)sv$/,
                loader: "dsv-loader"
            }
        ]
    },
    plugins: [
//         new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name][id].css"
        })
    ]
}
