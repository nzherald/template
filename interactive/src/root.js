import ENV from "Environment"
import Base from "./lib/base.js"
import {Elm} from "./Main.elm"
import "./root.less"


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector)
        console.log("Loading data...")
        this.premiumWait(() => {
            console.log("Rendering...")
            Elm.Main.init({node: document.querySelector(selector)})
            console.log("Done.")
            this.fadeOut()
        })
    }
}

window.Main = window.UniqClassName = Main
