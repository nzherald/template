const fs = require('fs')
const cheerio = require('cheerio')
const { makeFooter } = require('./embedgen.js')

// The footer is a chunk of HTML in a string in an object in a script tag (euuuggghhh)
function escapeChunk (chunk) {
    return chunk.replace(/\n\s*/g, "") // Remove newlines
                .replace(/\//g, "\\\/") // Escape slashes
                .replace(/"/g, "\\\"") // Escape quotes
}

// function replaceFusionFooter (indexFn, footerFn) {
//     console.log("Replacing fusion footer data in index.html...")
//     let success = false
//     const $ = cheerio.load(fs.readFileSync(indexFn, "utf-8"))
//     const footer = fs.readFileSync(footerFn, "utf-8")
//     const orig = new RegExp(/raw_text_footer","content":".+?"}/)
//     const targ = `raw_text_footer","content":"${escapeChunk(footer)}"}`
//     $("script").each((i, e) => {
//         const chunk = $(e).html()
//         if (chunk.match(orig)) {
//             $(e).text(chunk.replace(orig, targ)) // Use text not HTML, as HTML will cut all the escape characters
//             success = true
//             return false
//         }
//     })
//     if (success) {
//         console.log("Success!")
//         fs.writeFileSync(indexFn, $.html(), "utf8")
//     }
//     else {
//         console.error("Could not find embed footer chunk (hint: search for \"raw_text_footer\" in index.html)!")
//     }
// }

function replaceLiveFooter (indexFn) {
    console.log("Replacing embed footer in index.html...")
    let success = false
    const $ = cheerio.load(fs.readFileSync(indexFn, "utf-8"))
    const footer = makeFooter("#nzh-datavis-root", "./", "DataVisDevMain", "Local testing footer running!")
    if ($(".article__raw-html__bottom")) {
        $(".article__raw-html__bottom").html(footer)
        console.log("Success!")
        fs.writeFileSync(indexFn, $.html(), "utf8")
    }
    else {
        console.error("Could not find embed footer chunk (hint: search for \"article__raw-html__bottom\" in index.html)!")
    }
}

function hackAntiPiracy (indexFn, defaultjsFn, rubberStampFn) {
    console.log("Replacing paywall mechanism with rubber stamper...")
    let success = false
    const $ = cheerio.load(fs.readFileSync(indexFn, "utf-8"))

    // Overwrite antipiracy mechanism
    const defaultjs = fs.readFileSync(defaultjsFn, "utf-8")
    const badSnippet = `document.write(""),window.location=c.a.OFFERS_URL`
    fs.writeFileSync(defaultjsFn, defaultjs.replace(badSnippet, ""), "utf8")

    // Add mechanism to take down the paywall
    const rubberStamp = fs.readFileSync(rubberStampFn, "utf-8")
    $("body").append(rubberStamp)

    // Make index.html run local modified JS
    const orig = new RegExp(/https\:\/\/www.nzherald.co.nz\/pf\/dist\/components\/combinations\/(default\.js\?d=\d+)/)
    $("#fusion-engine-script").each((i, e) => {
        const match = $(e).attr("src").match(orig)
        if (match) {
            $(e).attr("src", match[1])
            success = true
            return false
        }
    })

    if (success) {
        console.log("Success!")
        fs.writeFileSync(indexFn, $.html(), "utf8")
    }
    else {
        console.error("Could not find embed footer chunk (hint: search for \"raw_text_footer\" in index.html)!")
    }
}

replaceLiveFooter(`${process.argv[2]}/index.html`)
hackAntiPiracy(`${process.argv[2]}/index.html`, `${process.argv[2]}/default.js`, `${process.argv[3]}/rubberstamp.html`)
