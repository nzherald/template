import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"


class Template {
    constructor (opt, b) {
        console.log("Starting:", this)
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.svg = {
            $: this.$.find("svg"),
            d3: this.d3.select("svg")
        }

		// Set up elements
        // this.makeAxes(opt.axes)

		$("<div>", {html: "module-templated.js loaded."}).appendTo(this.$)
        $(window).on("resize", () => this.redraw())
    }
    setData (data) {
		// Clean data here
        this.data = data
        this.redraw()
    }
    redraw () {
        this.onRedraw()
        this.setAxes()
		// Do interesting things here
    }
    onRedraw () {} // Placeholder for custom pre-redraw event


    //============//
    //   Values   //
    //============//
    _getX (d) {
	}
    _getY (d) {
	}


    //==========//
    //   Axes   //
    //==========//
    makeAxes (opt) {
        this.scale = opt.scale
        this.axis  = opt.axis
        _.each(this.axis, (axis, k) => {
            axis.scale(this.scale[k])
        })
    }
    setAxes () {
        const width  = this.svg.$.width(),
              height = this.svg.$.height()
        this.scale.x.range([0, width])
        this.scale.y.range([height, 0])
        this.d3.select(".xAxis").call(this.axis.x)
        this.d3.select(".yAxis").call(this.axis.y)
        this.d3.selectAll(".yAxis .tick text").at("x", "1em")
        this.d3.selectAll(".yAxis .tick line").at("x1", "2em")
                                              .at("x2", "100%")
    }
}

export default Template
