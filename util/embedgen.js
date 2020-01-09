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
            css.push(basePath + "loading.css") // Always add loading.css first
            for (var fn in compilation.assets) {
                if (/^root.*js$/.test(fn)) root = basePath + fn
                else if (/.*\.js$/.test(fn)) js.push(basePath + fn)
                else if (/.*\.css$/.test(fn)) {
                    if (fn === "loading.css") continue // Don't add loading again
                    else if (fn === "nzh-base.css") continue // Don't add nzh-base
                    else css.push(basePath + fn)
                }
            }

            // Create embed.js
            let jsContent = ""
            if (root) jsContent += makeJS(root, "r")
            js.forEach((src, i) => jsContent += makeJS(src, "_" + i))
            jsContent += "console.log('embed.js finished.');"
            jsContent = "(function () {" + jsContent + "})()"
            compilation.assets["embed.js"] = dump(jsContent)

            // Create embed.css
            let cssContent = ""
            css.forEach((url) => cssContent += makeCSS(url))
            compilation.assets["embed.css"] = dump(cssContent)

            // Create Zen embed code
            const divId = "nzh-datavis-root"
            const nzhLink = "https://www.nzherald.co.nz/premium/news/article.cfm?objectid=[!!! INSERT ZEN ID HERE !!!]"
            const zenContent = [
                `<div id="${divId}" class="nzh-datavis"><a href="${nzhLink}" target="_blank">Click here to see full interactive.</a></div>\n`,
                `<link href="${basePath}embed.css" rel="stylesheet">`,
                `<script src="${basePath}prelaunch.js"></script>`,
                `<script src="${basePath}embed.js"></script>`,
                `<script>window.onload = function () { new window.Main("#${divId}", {}) }</script>`
            ].join("\n")
            compilation.assets["zen.txt"] = dump(zenContent)
        })
    }
}

module.exports = EmbedPlugin
