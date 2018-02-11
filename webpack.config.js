const path = require('path')

module.exports = {
  entry : './src/index.js',
  output : {
    filename    : 'bundle.js',
    path        : path.resolve(__dirname, 'dist')
  },
  devServer : {
    contentBase : './dist',
    port        : 8080
  },
  module : {
    rules : [
      {
        test    : /\.less$/,
        loader  : "style-loader!css-loader!less-loader"
      },
      {
        test    : /\.css$/,
        loader  : "style-loader!css-loader"
      },
      {
        test    : /\.html$/,
        use     : [{
          loader  : 'html-loader',
          options : { minimize : true }
        }]
      },
      {
        test    : /\.(png|svg|jpg|gif)$/,
        loader  : "file-loader"
      },
      {
        test    : /\.(woff|woff2|eot|ttf|otf)$/,
        loader  : "file-loader"
      },
      {
        test    : /\.csv$/,
        loader  : "csv-loader",
        options : {
          // dynamicTyping: true,
          // header: true,
          skipEmptyLines: true
        }
      }
    ]
  }
}
