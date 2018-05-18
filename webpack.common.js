const HtmlWebpackPlugin = require("html-webpack-plugin")

// Interprets and bundles all necessary resources to run, with an index.html
module.exports = {
    entry: {
        loading: "./src/loading.js",
        root: "./src/root.js"
    },
    output: {
        filename: "[name].dev-bundle.[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader","css-loader", "less-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
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
    plugins : [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "util/template.html"
        })
    ]
}
