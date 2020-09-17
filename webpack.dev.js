const { merge } = require("webpack-merge");
const base = require("./webpack.common.js");
const path = require("path");
const EmbedPlugin = require("./util/embedgen.js");

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
    filename: "[name].dev.[hash].js",
  },
  devServer: {
    contentBase: ["./static", "./static-dev"],
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
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new EmbedPlugin({
      basePath: "",
    }),
  ],
  devtool: "source-map",
});
