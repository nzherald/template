/* Will add embed.js and embed.css to webpack build containing
 * code to add all the webpack produced css and js files.
 *
 * The purpose for this so that large files can be uploaded with
 * a decent cache timeout, and the small embed files can be essentially
 * uncached.
 *
 * The webpack entry points loading and root are special.
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
            let loading
            let root
            const js = []
            const css = []
            for (var fn in compilation.assets) {
                if (/^loading.*js$/.test(fn)) loading = basePath + fn
                else if (/^root.*js$/.test(fn)) root = basePath + fn
                else if (/.*\.js$/.test(fn)) js.push(basePath + fn)
                else if (/.*\.css$/.test(fn)) css.push(basePath + fn)
            }

            // Create embed.js
            let jsContent = ""
            jsContent += "var s=document.currentScript;"
            jsContent += "sessionStorage.setItem('loading','not-done');\n"
            if (loading) {
                jsContent += makeJS(loading, "l")
                jsContent += "l.setAttribute('data-targ', s.getAttribute('data-targ'));\n"
            }
            if (root) {
                jsContent += makeJS(root, "r")
                jsContent += "r.setAttribute('data-targ', s.getAttribute('data-targ'));"
                jsContent += "r.setAttribute('data-params', s.getAttribute('data-params'));"
                jsContent += `r.setAttribute('data-path', '${basePath}');\n`
            }
            js.forEach((src, i) => jsContent += makeJS(src, "_" + i))
            compilation.assets["embed.js"] = dump(jsContent)

            // Create embed.css
            let cssContent = ""
            css.forEach((url) => cssContent += makeCSS(url))
            compilation.assets["embed.css"] = dump(cssContent)
        })
    }
}

module.exports = EmbedPlugin
