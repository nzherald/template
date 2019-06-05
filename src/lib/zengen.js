import $ from "jquery"

// Generates embed code for Zen
class ZenGen {
    // Read parameters from script tag's data-params attribute
    static getScriptParams () {
        const params = document.currentScript.getAttribute("data-params")
        if (params && params !== "null") return this.parseParams(params)
    }

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
        const css = this.makeEmbedCSS(targ, path, params)
        const js = this.makeEmbedJS(targ, path, params)
        return $("<div/>").append(css).append(js).html()
    }

    static makeEmbedCSS (targ, path, params) {
        return $("<link/>").attr("href", path + "embed.css")
                           .attr("rel", "stylesheet")
    }

    static makeEmbedJS (targ, path, params) {
        if (typeof(params) === "object") params = $.param(params)
        return $("<script/>").attr("src", path + "embed.js")
                             .attr("data-targ", targ)
                             .attr("data-params", params)
    }
}

export default ZenGen
