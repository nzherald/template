import Base from "./lib/base.js"
import {Elm} from "./Main.elm"
import { nzhconsole, setupScrolly, appWarn } from "./lib/util.js"
import "./root.less"

import cases from "./assets/svg/cases.svg"
import casesSmall from "./assets/svg/cases-small.svg"
import cases2 from "./assets/svg/cases2.svg"
import cases2Small from "./assets/svg/cases2-small.svg"
import caseData from "./assets/svg/cases2.json"

const charts = {
    ChartOne: { normal: cases, small: casesSmall },
    ChartTwo: { normal: cases2, small: cases2Small, cases: caseData },
}


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector)
        console.log("Loading data...")
        this.premiumWait(() => {
            console.log("Rendering...")
            const chart = params.chart || "ChartOne"
            Elm.Main.init({node: document.querySelector(selector), flags: {
                chart,
                ...charts[chart]
            }})
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
