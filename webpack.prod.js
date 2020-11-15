const { merge } = require('webpack-merge')
const base = require('./webpack.common.js')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const { homepage, name } = require('./package.json')

// Post-processing and minification of bundle
module.exports = merge(base, {
  resolve: {
    alias: {
      Environment$: path.resolve(__dirname, 'util/production.js'),
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte', ".ts"],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  mode: 'production',
  output: {
    filename: '[name].prod.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: homepage,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|mjs|svelte)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hydratable: true,
            preprocess: require('svelte-preprocess')({
              babel: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      loose: true,
                      // No need for babel to resolve modules
                      modules: false,
                      targets: {
                        // ! Very important. Target es6+
                        esmodules: true,
                      },
                    },
                  ],
                ],
              }
            }),
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { globalVars: { projectName: name } } },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].prod.[chunkhash].css',
    }),
  ],
})
