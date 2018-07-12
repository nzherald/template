/*

Legend: Multiuse legend

Expected HTML:
<div id="target"></div>

Usage:
import * as d3scalechromatic from "d3-scale-chromatic"

new Legend({
    container : "#target",
    title     : "Spectrum/colour mode legend",
    type      : "spectrum" OR "colour",
    ticks     : 3 OR [-0.25, 0, 0.25], // Specifying a number will generate sensibly spaced ticks
    format    : "+.0%", // d3 format
    scale     : d3.scaleSequential(d3scalechromatic.interpolatePuOr)
                  .domain([-0.25, 0.25])
})

new Legend({
    container : "#target",
    title     : "Radius mode legend",
    type      : "radius",
    ticks     : [10, 50, 100, 1000],
    format    : "0",
    scale     : d3.scaleSequential(d3scalechromatic.interpolateBuPu)
                  .domain([0, 1000])
})

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import "./legend.less"


class Legend {
    constructor (opt) {
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.scale = opt.scale
        this.format = d3.format(opt.format || "")
        this.ticks = opt.ticks
        this.title = opt.title
        this.d3.classed("legend", true)
        this.d3.classed(opt.type, true)

        // Set legend type
        this.make = (opt.type === "colour") ? this.makeColour :
                    (opt.type === "spectrum") ? this.makeSpectrum :
                    (opt.type === "radius") ? this.makeRadius :
                    (typeof opt.type === "function") ? opt.type :
                    null
        if (!this.make) console.error("ERROR:", opt.type, "is not a valid Legend type.")

        this.update()
    }

    update () {
        if (this.title) {
            this.d3.selectAppend("h5.title")
                   .text(this.title)
        }
        this.d3.selectAppend("div.content")
               .call(ct => this.make(ct))
    }

    getTicks () {
        if (this.ticks instanceof Array) {
            return this.ticks
        }
        else if (typeof this.ticks === "number") {
            const domain = this.scale.domain(),
                  ticks = [],
                  base = domain[0],
                  dist = domain[1] - domain[0],
                  step = dist / (this.ticks - 1)
            for (let i = 0; i < this.ticks; i++) {
                ticks.push(base + i * step)
            }
            return ticks.reverse()
        }
        else {
            console.error("Ticks", this.ticks)
            throw "I don't understand what you want ticks to be!"
        }
    }

    makeColour  (ct) {
        const rows = ct.selectAppend("div.items").html("")
                       .appendMany("div.item", this.getTicks())
        rows.append("div.value")
            .datum(d => this.scale(d))
            .st("background-color", d => d)
        rows.append("div.label")
            .html(d => this.format(d))
    }

    makeSpectrum (ct) {
        ct.selectAppend("div.items").html("")
          .appendMany("div.item", this.getTicks())
          .html(d => this.format(d))

        ct.selectAppend("div.ribbon")
          .datum(this.getTicks())
          .st("background", d => {
              const flexDir = ct.select(".items").st("flex-direction")
              const direction = (flexDir === "row") ? "to right" :
                                (flexDir === "column") ? "to bottom" :
                                (flexDir === "row-reverse") ? "to left" :
                                (flexDir === "column-reverse") ? "to top" :
                                "to right"
              const params = _(d).map(this.scale).unshift(direction).join(",")
              return "linear-gradient(" + params + ")"
          })
    }

    makeRadius  (ct) {
        const rows = ct.selectAppend("div.items").html("")
                       .appendMany("div.item", this.getTicks())
        rows.append("div.value")
            .append("div.sample")
              .datum(d => this.scale(d))
              .st("width", d => d * 2)
              .st("height", d => d * 2)
              .st("border-radius", d => d)
        rows.append("div.label")
            .html(d => this.format(d))
    }
}

export default Legend
