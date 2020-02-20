const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// Interprets and bundles all necessary resources to run, with an index.html
module.exports = {
  entry: {
    root: './src/root.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(c|d|t)sv$/,
        loader: 'dsv-loader'
      },
      {
        test: /\.json$/,
        include: [
          path.resolve(__dirname, 'src/assets')
        ],
        type: 'javascript/auto',
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'src/assets')
        ],
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
              ref: true,
              replaceAttrValues: {
                'StagSans-Medium, Stag Sans': 'Stag Sans Medium'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(['static'])
  ]
}
