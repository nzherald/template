// Interprets and bundles all necessary resources to run, with an index.html
module.exports = {
    entry: {
        loading: "./src/loading.js",
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
            }
        ]
    }
}
