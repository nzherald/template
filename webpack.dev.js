const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const path = require("path")
const EmbedPlugin = require("./util/embedgen.js")
const { getPort } = require('portfinder-sync')
const { name } = require('./package.json')

const port = getPort(8080)
// Spins up dev server with bundles using minimal template
module.exports = merge(base, {
  resolve: {
    alias: {
      Environment$: path.resolve(__dirname, "util/development.js"),
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  mode: "development",
  output: {
    filename: "[name].dev.[contenthash].js",
    publicPath: "/"
  },
  devServer: {
    contentBase: ["./static", "./.nzh-rip"],
    open: true,
    port
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            hydratable: true,
            dev: true,
            preprocess: require("svelte-preprocess")({ /* options */ }),
          },
        },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", {
          loader: "less-loader",
          options: { lessOptions: { globalVars: { projectName: name } } }
        }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new EmbedPlugin({ name, basePath: "", }),
  ],
  devtool: "source-map",
});
