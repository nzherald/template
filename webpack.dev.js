const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const EmbedPlugin = require("./util/embedgen.js")

// Spins up dev server with bundles using minimal template
module.exports = merge(base, {
  resolve: {
    alias: {
      Environment$: path.resolve(__dirname, "util/development.js"),
    },
  },
  mode: "development",
  output: {
    filename: "[name].dev.[hash].js",
  },
  devServer: {
    contentBase: ["./static", "./static-dev"],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(js|ts)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].dev.[chunkhash].css",
    }),
    new EmbedPlugin({
      basePath: "",
    }),
    // new Dotenv({path: ".env.dev"})
  ],
});
