const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry  : {
        root : './src/root.js'
    },
    output : {
        filename : '[name].bundle.[hash].js',
        path     : path.resolve(__dirname, 'dist')
    },
    module : {
        rules : [
            {
                test   : /\.less$/,
                use: [ prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader' ]
            },
            {
                test   : /\.css$/,
                use: [ prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader' ]
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
                test: /\.(c|d|t)sv$/,
                use: ['dsv-loader']
            }
        ]
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: 'template.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
}
