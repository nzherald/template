const { merge } = require("webpack-merge");
const base = require("./webpack.common.js");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const { homepage } = require("./package.json");

// Post-processing and minification of bundle
module.exports = merge(base, {
  resolve: {
    alias: {
      Environment$: path.resolve(__dirname, "util/production.js"),
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
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
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hydratable: true
          },
        },
      },
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
        test: /\.(js|es6)$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        query: {
          plugins: [
            "@babel/transform-runtime",
            "@babel/proposal-object-rest-spread",
          ],
          presets: ["@babel/env"],
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].prod.[chunkhash].css",
    }),
  ],
});
