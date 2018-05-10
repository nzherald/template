import $ from "jquery"

import "./loading.less"
const HTML = require("./loading.html")


class Loading {
  constructor () {
    this.$ = $(HTML)
    this.$.appendTo("body")
  }

  fadeOut () {
    this.$.fadeTo(600, 0.01, () => this.$.remove())
  }
}

export default new Loading()
