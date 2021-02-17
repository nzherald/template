import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import Base from "./lib/base.js"
import { appWarn } from "./lib/util.js"
import HTML from "./root.html"
import "./root.less"

import rawData from "./data/dummy.csv"


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector, HTML)

        // Clean data
        console.log("Raw data:", rawData)
        data = this.data = this.cleanData(rawData)
        console.log("Cleaned data:", data)

        // Initialise visualisation (assume elements NOT rendered)

        this.premiumWait(params, () => {
            // Populate visualisation (assume elements are rendered)

            this.fadeOut()
        })
    }

    cleanData (rawData) {
        return rawData
    }
}

window.DataVisDevMain = window[ENV.name] = Main
