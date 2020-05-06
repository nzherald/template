import ENV from "Environment"
import Base from "./lib/base.js"
import HTML from "./root.html"
import "./root.less"


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector, HTML)
        console.log("Loading data...")
        null
        this.premiumWait(() => {
            console.log("Rendering...")
            null
            console.log("Done.")
            this.fadeOut()
        })
    }
}

window.Main = window.UniqClassName = Main
