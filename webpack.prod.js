// Post-processing and minification of bundle
// Configs
const { merge } = require("webpack-merge")
const base = require("./webpack.common.js")
const { homepage, name } = require("./package.json")
const { preprocess } = require("./svelte.config")
// Tools
const path = require("path")
// Plugins
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(base, {
    resolve: {
        alias: {
          svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte', ".ts"],
        mainFields: ['svelte', 'browser', 'module', 'main'],
      },
    mode: "production",
    output: {
        filename: "[name].prod.[chunkhash].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: homepage
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|svelte)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                },
              },
              {
                test: /\.svelte$/,
                use: {
                  loader: 'svelte-loader',
                  options: {
                    emitCss: true,
                    hydratable: true,
                    preprocess,
                  },
                },
              },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: { lessOptions: { globalVars: { projectName: name } } }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            ENV: JSON.stringify({
                name: name,
                path: homepage,
                isProduction: true,
                isDevelopment: false
            })
        }),
        new MiniCssExtractPlugin({ filename: "[name].prod.[chunkhash].css" })
    ]
})
