const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  entry  : {
    root : './src/root.js'
  },
  output : {
    filename : '[name].bundle.js',
    path     : path.resolve(__dirname, 'dist')
  },
  module : {
    rules : [
      {
        test   : /\.less$/,
        use    : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use      : ['css-loader', 'less-loader']
        })
      },
      {
        test   : /\.css$/,
        use    : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use      : 'css-loader'
        })
      },
      {
        test   : /\.html$/,
        loader : 'html-loader'
      },
      {
        test   : /\.(png|svg|jpg|gif)$/,
        loader : 'file-loader'
      },
      {
        test   : /\.(woff|woff2|eot|ttf|otf)$/,
        loader : 'file-loader'
      },
      {
        test   : /\.csv$/,
        loader : 'csv-loader',
        options: {
          // dynamicTyping: true,
          // header: true,
          skipEmptyLines: true
        }
      }
    ]
  },
  plugins : [
    new ExtractTextPlugin('style.css')
  ]
}
