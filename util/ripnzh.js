const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const { makeFooter } = require('./embedgen.js')

// Targets for ripping, in addition to index.html
const TARGS = [{
    name: "default.js",
    regex: new RegExp("[^\"]*/default\.js\\?[^\"]*"),
    parser: html => {
        console.log("Removing paywall anti-tampering protection...")
        const targ = 'document.write(""),window.location=c.a.OFFERS_URL'
        if (html.indexOf(targ) != -1) return html.replace(targ, "")
        else console.error("Could not remove paywall anti-tampering protection!")
    }
}, {
    name: "style.css",
    regex: new RegExp("[^\"]*/style\.css\\?[^\"]*")
}]


class RipNZHPlugin {
    constructor (options) {
        this.options = options
        if (options.layout == "normal") {
            console.log("Ripping normal premium (dj-t2) page...")
            options.targURL = "/nz/dj-t2/DEYOM6DGQCKKAQ4WBYJB5UJAHU/"
        }
        else if (options.layout == "bigread") {
            console.log("Ripping big-read premium (dj-t3) page...")
            options.targURL = "/nz/dj-t3/OH4O2PVLHHNA2UY7MHWH55CUOQ/"
        }
        else {
            console.error("Not a valid page type to rip. Choose \"normal\" or \"bigread\".")
        }
    }

    fetch (url, fn, transformResponse) {
        console.log(`Getting ${fn} from ${url}...`)
        return axios({
            method: "get",
            url: url,
            transformResponse: transformResponse
        }).then(res => {
            fs.writeFileSync(`${this.options.dstPath}/${fn}`, res.data, "utf8")
        })
    }

    apply () {
        const targURL = this.options.targURL
        const baseURL = this.options.baseURL
        const wrkPath = this.options.wrkPath

        this.fetch(baseURL + targURL, "index.html", html => {
            // Convert links
            const rawLinks = new RegExp('(src|href)="/([^"]*)"', "g")
            html = html.replace(rawLinks, `$1="${baseURL}/$2"`)

            // Find URLs for targets
            for (var match,t,i=0; i < TARGS.length; i++) {
                t = TARGS[i]
                match = html.match(t.regex)
                if (!match) {
                    console.error(`Cannot find ${t.name}! Maybe the page has changed and you need to update the targeting regex?`)
                    return
                }
                t.url = match[0]
                html = html.replace(t.url, t.name) // Make index.html run local modified version
            }

            // Both the pre-rendered footer and source data used to generate it have to be updated
            console.log("Replacing data for footer generation in index.html...")
            const footer = makeFooter("#nzh-datavis-root", "./", "DataVisDevMain", "Placeholder load event is instantiating new DataVisDevMain.")

            // The Fusion data element has to be updated, or it'll overwrite the pre-rendered footer after load
            const footerStr = JSON.stringify(footer).replace(/<\//g, "<\\/") // An escape character is expected for forward slashes in closing tags
            const footerContent = new RegExp('(?<="subtype":"raw_text_footer","content":)".*?"(?=})')
            match = html.match(footerContent)
            if (!match) {
                console.error(`Cannot find expected Fusion data element for footer! I'm expected an element of "subtype":"raw_text_footer".`)
                return
            }
            html = html.replace(footerContent, footerStr)

            // Load HTML into the parser - don't manipulate the raw HTML from this point onwards
            const $ = cheerio.load(html)

            // The pre-rendered element has to be replaced, or it'll load the wrong thing when the page loads
            console.log("Replacing pre-rendered embed footer in index.html...")
            const targ = $(".article__raw-html__bottom")
            if (targ) targ.html(footer)
            else console.error("Cannot find embed footer chunk (hint: search for \"article__raw-html__bottom\" in index.html)!")

            // Small script to manually take down paywall - will trigger anti-tampering protection unless it's been removed
            console.log("Adding paywall removal rubber stamper...")
            const rubberStamp = fs.readFileSync(`${wrkPath}/rubberstamp.html`, "utf-8")
            $("body").append(rubberStamp)

            return $.html()
        }).then(html => {
            // Download and modify target files
            for (var t,i=0; i < TARGS.length; i++) {
                t = TARGS[i]
                this.fetch(t.url, t.name, t.parser)
            }
        })
    }
}

module.exports = RipNZHPlugin
