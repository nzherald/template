/*

ScriptBox: Pretty text box used for controlling visualisations

Expected HTML:
<div id="target"></div>

new ScriptBox({container : "#target"}, [{
    name: "intro",
    html: "<p>Hello world</p>",
    action: () => visualisation.show()
}, {
    name: "end",
    html: "<p>Goodbye world</p>",
    action: () => visualisation.hide()
}])

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import "./scriptbox.less"


class ScriptBox {
    constructor (opt, script) {
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.d3.classed("scriptbox", true)
        this.text = this.d3.selectAppend("div.text")
        this.script = script
        this.makeControls()
    }

    toPrev () { this.setPos(this.pos - 1) }
    toNext () { this.setPos(this.pos + 1) }

    setPos (pos) {
        const script = this.script[pos]
        if (!script || pos === this.pos) return
        this.pos = pos
        this.text.html(script.html)
        this.status.html((pos + 1) + " of " + this.script.length)
        script.action()
        this.setControls()
    }

    makeControls () {
        // Make elements
        const ct = this.d3.selectAppend("div.controller")
        this.status = ct.selectAppend("div.status")
        this.prev = ct.selectAppend("div.control.prev")
        this.next = ct.selectAppend("div.control.next")
        this.pips = ct.selectAppend("div.pips")

        // Set actions
        this.prev.html("Back").on("click", () => this.toPrev())
        this.next.html("Next").on("click", () => this.toNext())
        this.pips.appendMany("div.pip", this.script)
                 .on("click", (d, i) => this.setPos(i))
    }

    setControls () {
        let pos = this.pos
        this.prev.classed("disabled", pos <= 0)
        this.next.classed("disabled", pos >= this.script.length - 1)
        this.pips.selectAll(".pip")
                 .classed("active", (d, i) => i <= pos)
    }

    captureKeystrokes () {
        $(window).keydown(e => {
            switch (e.keyCode) {
                case 37: return this.toPrev() // Left
                case 39: return this.toNext() // Right
            }
        })
    }
}

export default ScriptBox
