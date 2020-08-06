import ENV from "Environment"
import Base from "./lib/base.js"
import { appWarn } from "./lib/util.js"
import HTML from "./root.html"
import "./root.less"

console.log(ENV)

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
            //this.fadeOut()
            if (params.appWarn) {
                appWarn(this.root.selector, params.appWarn, params.category)
            }
        })
    }
}

window.Main = window.UniqClassName = Main
