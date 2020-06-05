import ENV from "Environment"
import Base from "./lib/base.js"
import { nzhconsole, setupScrolly, appWarn } from "./lib/util.js"
import HTML from "./root.html"
import HTML2 from "./root2.html"
import "./root.less"

class Main extends Base {
    constructor (selector, params) {
        nzhconsole("Setting up visualisation with parameters:", params)
        super(selector, params.chart == "māori" ? HTML2 : HTML)
        nzhconsole("Loading data...")
        null
        this.premiumWait(() => {
            nzhconsole("Rendering...")
            null
            nzhconsole("Done.")
            this.fadeOut()
            if (params.setupScrolly) {
                const scrolly = setupScrolly(params.setupScrolly)
            }
            if (params.appWarn) {
                appWarn(this.root.selector, params.appWarn, params.category)
            }
        })
    }
}

window.Main = window.UniqClassName = Main
