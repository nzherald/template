import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import "./base.less"
import "./root.less"
import Template from "./lib/module-template.js"
const HTML = require("./root.html")


class Main {
    constructor () {
        $(HTML).appendTo("#root")
		const T = new Template({
			container: "#root"
		})
        $("#loading").fadeTo(600, 0.01, () => {
            $("#loading").remove()
            console.log("Loader removed.")
        })
    }
}

new Main()
