import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import SVGBeeswarm from "./beeswarm.js"
import "./beeswarm.less"


class Beeswarm extends SVGBeeswarm {
    constructor (opt, b) {
        super(opt)
        this.canvas = {
            d3: this.d3.select(".canvas-container")
                       .selectAppend("canvas.main"),
            $: this.$.find("canvas.main")
        }
        this.svg.$.remove()
        this.svg = this.canvas
    }

    // Disable SVG specific functions
    makeNodes () {}
    drawNodes () {}
    setAxes () {}

    // Actual canvas redraw here
    onTick () {
        const width = this.canvas.$.width(),
              height = this.canvas.$.height(),
              context = this.canvas.d3.node().getContext("2d")
        context.clearRect(0, 0, width, height)
        _.each(this.data, d => {
            if (!d.tx || !d.ty) return // Don't draw invalid nodes
            context.beginPath()
            context.fillStyle = this.getC(d)
            context.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
            context.fill()
        })
    }

    // Canvas needs width/height attributes to scale properly
    setRanges () {
        const width = this.canvas.$.width(),
              height = this.canvas.$.height()
        this.d3.selectAll("canvas")
               .at("width", width)
               .at("height", height)
        this.scale.x.range([0, width])
        this.scale.y.range([height, 0])
    }
}

export default Beeswarm
