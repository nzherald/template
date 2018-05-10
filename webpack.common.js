const path = require('path')
const url = require('url')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const package = require('./package.json');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: {
        loading: "./src/loading.js",
        root: "./src/root.js",
    },
    output : {
        filename : '[name].bundle.[hash].js',
        publicPath: prod ? (package.homepage ? (new url.URL(package.homepage).pathname) : "/") : "/",
        path     : path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test   : /\.less$/,
                use: [ prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader' ]
            },
            {
                test   : /\.css$/,
                use: [ prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader' ]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            },
            {
                test: /\.(c|d|t)sv$/,
                loader: "dsv-loader"
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
        new HtmlWebpackHarddiskPlugin(),
        function() {
            this.hooks.emit.tap("EmbedPlugin", function(compilation, callback) {
                let js = [];
                let css = [];
                for (var filename in compilation.assets) {
                    if (/.*\.css$/.test(filename)) {
                        css.push(filename);
                    } else if (/.*\.js$/.test(filename)) {
                        js.push(filename);
                    }
                }
                const base = prod ? package.homepage || "" : "";
                const build = function(vals,line,out) {
                    if (vals.length) {
                        let valsStr = "";
                        vals.forEach(function(f) {
                            valsStr = valsStr.concat(line(f));
                        });
                        compilation.assets[out] = {
                            source: function() {
                                return valsStr;
                            },
                            size: function() {
                                return valsStr.length;
                            }
                        }
                    }
                }
                build(js,function(f) { return `$.getScript("${base}${f}");\n`}, 'embed.js');
                build(css,function(f) { return `@import("${base}${f}")\n`}, 'embed.css');
            });
        }
    ]
}
