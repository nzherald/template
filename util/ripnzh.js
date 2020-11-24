const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const { makeFooter } = require('./embedgen.js')

function fetch (url, path, fn, parse) {
    console.log(`Getting ${fn} from ${url}...`)
    axios.get(url).then(res => {
        let html = res.data
        if (parse) html = parse(html)
        fs.writeFileSync(`${path}/${fn}`, html, "utf8")
    })
}

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

    apply () {
        const targURL = this.options.targURL
        const baseURL = this.options.baseURL
        const dstPath = this.options.dstPath
        const wrkPath = this.options.wrkPath
        const targs = [{
            name: "default.js",
            regex: new RegExp("[^\"]*/default\.js\\?[^\"]*"),
            parser: html => {
                console.log("Removing paywall tampering intervention...")
                const targ = 'document.write(""),window.location=c.a.OFFERS_URL'
                if (html.indexOf(targ) != -1) return html.replace(targ, "")
                else console.error("Could not remove paywall tampering intervention!")
            }
        }, {
            name: "style.css",
            regex: new RegExp("[^\"]*/style\.css\\?[^\"]*")
        }]

        fetch(baseURL + targURL, dstPath, "index.html", html => {
            // Convert links
            const rawLinks = new RegExp('(src|href)="/([^"]*)"', "g")
            html = html.replace(rawLinks, `$1="${baseURL}/$2"`)

            // Download and modify target files
            for (var match,t,i=0; i < targs.length; i++) {
                t = targs[i]
                match = html.match(t.regex)
                if (!match) {
                    console.error(`Cannot find ${t.name}! Maybe the page has changed and you need to update the targeting regex?`)
                    return
                }
                fetch(match[0], dstPath, t.name, t.parser) // Fetch and parse
                html = html.replace(match[0], t.name) // Make index.html run local modified version
             }

             // Additional modifications to index.html
             const $ = cheerio.load(html)

             console.log("Adding paywall removal rubber stamper...")
             const rubberStamp = fs.readFileSync(`${wrkPath}/rubberstamp.html`, "utf-8")
             $("body").append(rubberStamp)

             console.log("Replacing embed footer in index.html...")
             const targ = $(".article__raw-html__bottom")
             const footer = makeFooter("#nzh-datavis-root", "./", "DataVisDevMain", "Placeholder load event is instantiating new DataVisDevMain.")
             if (targ) targ.html(footer)
             else console.error("Could not find embed footer chunk (hint: search for \"article__raw-html__bottom\" in index.html)!")

             return $.html()
        })
    }
}

module.exports = RipNZHPlugin
