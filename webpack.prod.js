const merge = require("webpack-merge");
const base = require("./webpack.common.js");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const Dotenv = require("dotenv-webpack");
const { homepage } = require("./package.json");

// Post-processing and minification of bundle
module.exports = merge(base, {
  resolve: {
    alias: {
      Environment$: path.resolve(__dirname, "util/production.js"),
    },
  },
  mode: "production",
  output: {
    filename: "[name].prod.[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: homepage,
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
            options: { plugins: [autoprefixer()] },
          },
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: { plugins: [autoprefixer()] },
          },
        ],
      },
      {
        test: /\.(js|ts)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxSize: 200000,
    },
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].prod.[chunkhash].css",
    }),
    // new Dotenv({path: ".env.prod"})
  ],
});
