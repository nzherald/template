import ENV from "Environment"
import Base from "./lib/base.js"
import {Elm} from "./Main.elm"
import { nzhconsole, setupScrolly, appWarn } from "./lib/util.js"
import "./root.less"

class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector)
        console.log("Loading data...")
        this.premiumWait(() => {
            console.log("Rendering...")
            Elm.Main.init({node: document.querySelector(selector), flags: {...params}})
            console.log("Done.")
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
