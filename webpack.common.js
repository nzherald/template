// Interprets and bundles all necessary resources to run, with an index.html
const path = require("path")

module.exports = {
    entry: {
        root: "./src/root.js"
    },
    module: {
        rules: [
            {
                include: path.resolve(__dirname, "./src/assets"),
                type: "asset/resource"
            },
            {
                exclude: path.resolve(__dirname, "./src/assets"),
                rules: [
                    {
                        test: /\.html$/,
                        loader: "html-loader"
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        type: "asset/resource"
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        type: "asset/resource"
                    },
                    {
                        test: /\.(csv|dsv|tsv)$/,
                        loader: "dsv-loader"
                    }
                ]
            }
        ]
    }
}
