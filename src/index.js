import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import "./style.less"
const HTML = require("./root.html")


class Main {
  constructor () {
    $(HTML).appendTo("#root")
    $("<div>", { html : "Javascript goes here." }).appendTo("#root")
  }
}

new Main()
