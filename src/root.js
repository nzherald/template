import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import Template from "./lib/module-template.js"
import HTML from "./root.html"
import "./base.less"
import "./root.less"


class Main {
    constructor () {
        $(HTML).appendTo("#root")
        const T = new Template({
            container: "#root .mainvis"
        })
        this.fadeOut()
    }

    cleanData (rawData) {
        console.log("Raw data:", rawData)
        return _.map(rawData, d => {
            return d
        })
    }

    fadeOut (b) {
        localStorage.setItem("loading", "done");
        $("#loading").fadeTo(600, 0.01, () => {
            $("#loading").remove()
            console.log("Loading screen removed.")
            if (b) b()
        })
    }
}

new Main()
