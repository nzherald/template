import Base from "./lib/base.js"
import {Elm} from "./Main.elm"
import "./root.less"

import cases from "./svg/cases.svg"
import casesSmall from "./svg/cases-small.svg"
import cases2 from "./svg/cases2.svg"
import cases2Small from "./svg/cases2-small.svg"

const charts = {
    ChartOne: { normal: cases, small: casesSmall },
    ChartTwo: { normal: cases2, small: cases2Small },
}


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector)
        console.log("Loading data...")
        this.premiumWait(() => {
            console.log("Rendering...")
            Elm.Main.init({node: document.querySelector(selector), flags: {
                chart:params.chart,
                ...charts[params.chart]
            }})
            console.log("Done.")
            this.fadeOut()
        })
    }
}

window.Main = window.UniqClassName = Main
