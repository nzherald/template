/*

Slider + play button

Expected HTML:
<div id="target"></div>

Usage:
new TimeSlider({
    container: "#time",
    domain: ["20-01-01", "20-01-02", "20-01-03", "20-01-04", "20-01-05"],
    onChange: function () {
        viz.setPeriod(this.value * 1)
    }
})

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import playButton from "./timeslider.html"
import "./timeslider.less"


class TimeSlider {
    constructor (opt) {
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.scale = d3.scaleOrdinal().domain(opt.domain)
        this.d3.classed("timeslider", true)
        this.makeElements(opt)
    }

    makeElements (opt) {
        const el = this.d3.selectAppend("div.main")
        el.selectAppend("div.button")
        el.selectAppend("input")
          .at("type", "range")
          .at("min", 0)
          .at("max", this.scale.domain().length - 1)
          .at("value", this.scale.domain().length - 1)
        this.setButton(false)
        this.setEvents(opt)
    }

    setEvents (opt) {
        this.d3.selectAppend("div.button")
               .on("click", () => this.play(opt.animateTime || 600))
        this.d3.selectAppend("input")
               .on("input", opt.onChange)
               .on("click", () => {
                   this._playing = null
                   this.setButton(false)
               })
    }

    setButton (isPlaying) {
        const svg = $(playButton).find((isPlaying) ? ".pause" : ".play")
        this.d3.select("div.button").html(svg.prop("outerHTML"))
    }

    play (t) {
        if (this._playing) {
            this._playing = null
            this.setButton(false)
            console.log("Interrupting...")
        }
        else {
            this._playing = {start: new Date()}
            this.setButton(true)
            console.log("Playing...")
            const el = this.d3.select("input").nodes()[0]
            const val = el.value * 1
            const max = el.max * 1
            const min = el.min * 1
            if (val == max) this.setFrame(min, t)
            else this.setFrame(val, t)
        }
    }

    setFrame (val, t) {
        const curr = this._playing
        const el = this.d3.select("input").nodes()[0]
        console.log("Frame:", val)
        val *= 1
        el.value = val
        this.d3.select("input").dispatch("input")
        setTimeout(() => {
            if (this._playing !== curr) {
                console.log("Interrupted.")
            }
            else if (val >= el.max) {
                this._playing = null
                this.setButton(false)
                console.log("Finished.")
            }
            else this.setFrame(val + 1, t)
        }, t)
    }
}

export default TimeSlider
