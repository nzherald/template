const merge = require("webpack-merge")
const base = require("./webpack.prod.js")
const EmbedPlugin = require("./util/embedgen.js")

// Generates embed.js and but does not deploy
module.exports = merge(base, {
    plugins: [
        new EmbedPlugin({basePath: ""})
    ]
})
