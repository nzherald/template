const path = require('path')
const { preprocess } = require("./svelte.config")
const nodeExternals = require('webpack-node-externals')
const { homepage } = require('./package.json')

// Post-processing and minification of bundle
module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte', ".ts"],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  mode: 'production',
  entry: {
    root: './src/Ssr.svelte',
  },
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, 'server'),
    publicPath: homepage,
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, 'src/assets')],
        loader: 'file-loader',
        type: 'javascript/auto',
      },
      {
        exclude: [path.resolve(__dirname, 'src/assets')],
        rules: [
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            test: /\.(png|svg|jpg|gif|JPG|jpeg)$/,
            loader: 'file-loader',
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader',
          },
          {
            test: /\.(csv|dsv|tsv)$/,
            loader: 'dsv-loader',
          },
        ],
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: false,
            hydratable: true,
            generate: 'ssr',
            preprocess
          },
        },
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|es6)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        query: {
          plugins: [
            '@babel/transform-runtime',
            '@babel/proposal-object-rest-spread',
          ],
          presets: ['@babel/env'],
        },
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader',
      },
    ],
  },
  plugins: [],
}
