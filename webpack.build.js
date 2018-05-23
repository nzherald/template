const merge = require("webpack-merge")
const base = require("./webpack.build-common.js")
const EmbedPlugin = require("./util/embed")

// Generates embed.js and but does not deploy
module.exports = merge(base, {
    mode: "production",
    plugins: [
        new EmbedPlugin({basePath: ""})
    ]
})
