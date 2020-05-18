const CopyWebpackPlugin = require("copy-webpack-plugin")

// Interprets and bundles all necessary resources to run, with an index.html
module.exports = {
    entry: {
        root: "./src/root.js"
    },
    module: {
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
                test: /\.(c|d|t)sv$/,
                loader: "dsv-loader"
            },
            {
                test: /\.(json|csv|dsv|tsv|svg)$/,
                include: [
                    path.resolve(__dirname, "src/assets")
                ],
                type: "javascript/auto",
                loader: "file-loader"
            }

        ]
    },
    plugins: [
        new CopyWebpackPlugin(["static"])
    ]
}
