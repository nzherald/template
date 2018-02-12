const path = require('path')

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
        loader : "style-loader!css-loader!less-loader"
      },
      {
        test   : /\.css$/,
        loader : "style-loader!css-loader"
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true }
        }]
      },
      {
        test   : /\.(png|svg|jpg|gif)$/,
        loader : "file-loader"
      },
      {
        test   : /\.(woff|woff2|eot|ttf|otf)$/,
        loader : "file-loader"
      },
      {
        test   : /\.csv$/,
        loader : "csv-loader",
        options: {
          // dynamicTyping: true,
          // header: true,
          skipEmptyLines: true
        }
      }
    ]
  }
}
