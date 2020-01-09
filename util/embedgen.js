/* Will add embed.js and embed.css to webpack build containing
 * code to add all the webpack produced css and js files.
 *
 * The purpose for this so that large files can be uploaded with
 * a decent cache timeout, and the small embed files can be essentially
 * uncached.
 *
 * The webpack entry points root is special.
 * In the javascript loader loading is loaded before anything else
 * and then root is loaded.
 */

function makeJS (src, id) {
    return `var ${id}=document.createElement('script');${id}.src='${src}';document.body.appendChild(${id});\n`
}

function makeCSS (url) {
    return `@import url('${url}');\n`
}

function dump (content, fn) {
    if (content.length) return {
        source: function () { return content },
        size: function () { return content.length }
    }
}


class EmbedPlugin {
    constructor (options) {
        this.options = options
    }

    apply (compiler) {
        const self = this
        compiler.hooks.emit.tap("EmbedPlugin", function (compilation, callback) {
            const basePath = self.options.basePath || ""
            // Sort assets
            let root
            const js = []
            const css = []
            css.push(basePath + "loading.css") // loading.css is a static file
            for (var fn in compilation.assets) {
                if (/^root.*js$/.test(fn)) root = basePath + fn
                else if (/.*\.js$/.test(fn)) js.push(basePath + fn)
                else if (/.*\.css$/.test(fn)) css.push(basePath + fn)
            }

            // Create embed.js
            let jsContent = "(function () {"
            jsContent += "console.log('embed.js running.');"

            if (root) {
                jsContent += makeJS(root, "r")
            }
            js.forEach((src, i) => jsContent += makeJS(src, "_" + i))
            jsContent += "})()"
            compilation.assets["embed.js"] = dump(jsContent)

            // Create embed.css
            let cssContent = ""
            css.forEach((url) => cssContent += makeCSS(url))
            compilation.assets["embed.css"] = dump(cssContent)
        })
    }
}

module.exports = EmbedPlugin
