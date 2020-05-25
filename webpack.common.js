const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

// Interprets and bundles all necessary resources to run, with an index.html
module.exports = {
    entry: {
        root: "./src/root.js"
    },
    module: {
        rules: [
            {
                include: [ path.resolve(__dirname, "src/assets") ],
                loader: "file-loader",
                type: "javascript/auto"
            },
            {
                exclude: [ path.resolve(__dirname, "src/assets") ],
                rules: [
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
                        test: /\.(csv|dsv|tsv)$/,
                        loader: "dsv-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [ { from: 'static'} ] })
    ]
}
