import $ from "jquery"

// Generates embed code for Zen
class ZenGen {
    // Read parameters from URL
    static getURLParams () {
        const params = window.location.href.split("?")[1]
        if (params) return this.parseParams(params)
    }

    // Turn serialised parameters into object (e.g. "id=5&period=2017/01/01" => {id: 5, period: "2017/01/01"})
    // Use $.param() to go the other way
    static parseParams (url) {
        const out = {}
        _.each(url.split("&"), s => {
            const a = s.split("=")
            out[a[0]] = decodeURIComponent(a[1])
        })
        return out
    }

    // Generate a target ID
    static makeTargID (path, params) {
        let name = /\/([\w-]+)\/$/.exec(path)[1]
        if (params) name += "-" + params.replace(/%20|[=%]/g,"")
        return "#" + name.toLowerCase()
    }

    // The bit that you paste into the article
    static makeRootDiv (targ, path) {
        const ct = $("<div/>")
        const root = $("<div/>")
        if (targ[0] === "#") root.attr("id", targ.substr(1))
        else if (targ[0] === ".") root.attr("class", targ.substr(1))
        else console.error("ZenGen.makeRootDiv(): Invalid selector - " + targ + "!")
        root.addClass("nzh-datavis")
        return ct.append(root).html()
    }

    // The bit that you paste into the footer
    static makeFooter (targ, path, params) {
        if (path[path.length - 1] != "/") path +"/"
        const el = [
            `<link href="${path}embed.css" rel="stylesheet">`,
            `<script src="${path}prelaunch.js"></script>`,
            `<script src="${path}embed.js"></script>`,
            `<script>window.onload = function () { new window.Main("${targ}", ${JSON.stringify(params)}) }</script>`
        ]
        return el.join("\n")
    }
}

export default ZenGen
