/* Will add embed.js and embed.css to webpack build containing
 * code to add all the webpack produced css and js files.
 *
 * The purpose for this so that large files can be uploaded with
 * a decent cache timeout, and the small embed files can be essentially
 * uncached.
 *
 * The webpack entry points root is special.
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

    // Read and deserialise parameters from URL
    static getURLParams () {
        const params = window.location.href.split("?")[1]
        const out = {}
        if (!params) return
        _.each(params.split("&"), s => {
            const a = s.split("=")
            out[a[0]] = decodeURIComponent(a[1])
        })
        return out
    }

    // The bit that you paste into the footer
    // Prelaunch must be deferred to destroy the global style that the app tries to apply (which is created via a script we don't control)
    // Everything else must also be deferred, so that they run after prelaunch
    static makeFooter (targ, path, name, msg, params) {
        if (path[path.length - 1] != "/") path += "/"
        return [
            `<link href="${path}embed.css" rel="stylesheet">`,
            `<script defer src="${path}prelaunch_v2.js"></script>`,
            `<script defer src="${path}embed.js"></script>`,
            `<script>window.addEventListener("load", function () { console.log("${msg}"); new window["${name}"]("${targ}", ${JSON.stringify(params || {})}); })</script>`
        ].join("\n")
    }

    apply (compiler) {
        const self = this
        compiler.hooks.emit.tap("EmbedPlugin", function (compilation, callback) {
            const basePath = self.options.basePath || ""
            const mainName = self.options.name || "DataVisDevMain"
            // Sort assets
            let root
            const js = []
            const css = []
            const ignore = ["prelaunch_v2.js"]
            for (var fn in compilation.assets) {
                if (ignore.indexOf(fn) > -1) continue
                else if (/^root.*js$/.test(fn)) root = basePath + fn
                else if (/.*\.js$/.test(fn)) js.push(basePath + fn)
                else if (/.*\.css$/.test(fn)) css.push(basePath + fn)
            }

            // Create embed.js
            let jsContent = ""
            if (root) jsContent += makeJS(root, "r") // Always load root first
            js.forEach((src, i) => jsContent += makeJS(src, "_" + i))
            jsContent += `console.log('embed.js loaded root.js and ${js.length} other scripts.');`
            compilation.assets["embed.js"] = dump(`(function () {${jsContent}})()`)

            // Create embed.css
            let cssContent = ""
            cssContent += makeCSS(basePath + "loading.css") // Always load loading.css first
            css.forEach((url) => cssContent += makeCSS(url))
            compilation.assets["embed.css"] = dump(cssContent)

            // Create Zen code
            const targ = "#nzh-datavis-root"
            const embed = `<div id='${ targ.substr(1) }' class="nzh-datavis"></div>`
            const footer = EmbedPlugin.makeFooter(targ, basePath, mainName, `Default load event is instantiating new ${mainName}.`)
            compilation.assets["zen.txt"] = dump(`${embed}\n\n${footer}`)
        })
    }
}

module.exports = EmbedPlugin
