/* Will add embed.js and embed.css to webpack build containing
 * code to add all the webpack produced css and js files.
 *
 * The purpose for this so that large files can be uploaded with
 * a decent cache timeout, and the small embed files can be essentially
 * uncached.
 *
 * The webpack entry points root is special.
 */

function makeJS (src, id, onLoad) {
    return `var ${id}=document.createElement('script');` +
           `${id}.src='${src}';` +
           ((onLoad) ? `${id}.onload=${onLoad};` : "") +
           `document.body.appendChild(${id});\n`
 }

function makeCSS (url) {
    return `@import url('${url}');\n`
}

function dump (content) {
    return {
        source: function () { return content },
        size: function () { return content.length }
    }
}


class EmbedPlugin {
    constructor (options) {
        this.options = options
    }

    // The bit that you paste into the footer
    // Prelaunch must be deferred to destroy the global style that the app tries to apply (which is created via a script we don't control)
    // Everything else must also be deferred, so that they run after prelaunch
    static makeFooter (path, onLoad) {
        if (path[path.length - 1] != "/") path += "/"
        return `<link href="${path}embed.css" rel="stylesheet">\n` +
               `<script defer src="${path}prelaunch_v3.js"></script>\n` +
               `<script defer src="${path}embed.js"></script>\n` +
               ((onLoad) ? `<script>window.addEventListener("load", ${onLoad})</script>` : "")
    }

    static makeLoader (targName, funcName, params, msg) {
        return `function(){console.log("${msg}");new window["${funcName}"]("${targName}",${JSON.stringify(params || {})});}`
    }

    apply (compiler) {
        const o = this.options
        const isHomepage = (o.basePath == "https://insights.nzherald.co.nz/apps/homepagebanner/")
        const onLoad = EmbedPlugin.makeLoader(o.targName, o.funcName, o.params, `Default load event is instantiating new ${o.funcName}.`)
        compiler.hooks.emit.tap("EmbedPlugin", function (compilation, callback) {
            // Sort assets
            let root
            const js = []
            const css = []
            const ignore = ["prelaunch_v3.js"]
            for (var fn in compilation.assets) {
                if (ignore.indexOf(fn) > -1) continue
                else if (/^root.*js$/.test(fn)) root = o.basePath + fn
                else if (/.*\.js$/.test(fn)) js.push(o.basePath + fn)
                else if (/.*\.css$/.test(fn)) css.push(o.basePath + fn)
            }

            // Create embed.js (always load root first)
            let jsContent = ""
            if (root) jsContent += makeJS(root, "r", (isHomepage) ? onLoad : "") // Homepages cannot rely on window.load event because something something React, so stick the loader as a script.load inside embed.js
            js.forEach((src, i) => jsContent += makeJS(src, "_" + i))
            jsContent += `console.log('embed.js loaded root.js and ${js.length} other scripts.');`
            if (jsContent.length) compilation.assets["embed.js"] = dump(`(function () {${jsContent}})()`)

            // Create embed.css
            let cssContent = ""
            css.forEach((url) => cssContent += makeCSS(url))
            if (cssContent.length) compilation.assets["embed.css"] = dump(cssContent)

            // Create Zen code
            const embed = `<div id="${ o.targName.substr(1) }" class="nzh-datavis"></div>`
            const footer = EmbedPlugin.makeFooter(o.basePath, (!isHomepage) ? onLoad : "") // Normally (for non-homepage things) the loader script goes outside of embed.js
            compilation.assets["zen.txt"] = dump(`${embed}\n\n${footer}`)
        })
    }
}

module.exports = EmbedPlugin
