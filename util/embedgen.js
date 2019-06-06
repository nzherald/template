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

const BAD_BROWSER = '<b>Sorry! Your browser does not support this content.</b>' +
                    '<p>Please try <a href="https://www.microsoft.com/en-nz/windows/microsoft-edge" target="_blank">Microsoft Edge</a>, <a href="https://www.google.com/chrome/" _target="_blank">Google Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/" _target="_blank">Mozilla Firefox</a>.</p>'

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
            let jsContent = "(function () {"
            jsContent += "console.log('embed.js running.');"
            jsContent += "var s=document.currentScript;var targ=s.getAttribute('data-targ');var params=s.getAttribute('data-params');\n"

            // Browser check and fail
            jsContent += "var isIE=navigator.appName=='Microsoft Internet Explorer'||!!(navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/rv:11/));"
            jsContent += `if (isIE) {document.querySelector(targ).innerHTML='${BAD_BROWSER}'; throw "Unsupported browser!";}\n`

            if (loading) {
                jsContent += "sessionStorage.setItem('loading','not-done');\n"
                jsContent += makeJS(loading, "l")
                jsContent += "l.setAttribute('data-targ', targ || '');\n"
            }
            if (root) {
                jsContent += makeJS(root, "r")
                jsContent += "r.setAttribute('data-targ', targ || '');"
                jsContent += "r.setAttribute('data-params', params || '');"
                jsContent += `r.setAttribute('data-path', '${basePath}');\n`
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
