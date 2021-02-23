import Base from "./lib/base.js"
import HTML from "./root.html"
import "./root.less"

class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector, HTML)
        console.log("Loading data...")
        null
        this.premiumWait(params, () => {
            console.log("Rendering...")
            null
            if (window.styleCheck) window.styleCheck(this.root.node, "embed.css")
        })
    }
}

window.DataVisDevMain = window[ENV.name] = Main
