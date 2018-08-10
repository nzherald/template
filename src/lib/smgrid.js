/*

SM Grid: Small multiples grid (sparklines by default)

Expected HTML (nothing, everything is dynamically constructed):
<div id="containername"></div>

Expected data:
[{
    "name":"Labour's Plan",
    "points":[
        {"period":"2018/19", "val":114263000000},
        {"period":"2019/20", "val":119987000000},
        {"period":"2020/21", "val":124982000000},
        {"period":"2021/22", "val":130992000000}
    ]
},
{
    "name":"National's Plan",
    "points":[
        {"period":"2018/19", "val":114263000000},
        {"period":"2019/20", "val":119987000000},
        {"period":"2020/21", "val":124982000000},
        {"period":"2021/22", "val":130992000000}
    ]
}]

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import BaseLine from "./baseline.js"
import "./smgrid.less"


class SMGrid extends BaseLine {
    constructor (opt, b) {
        super(opt)
        this.d3.classed("smgrid", true)
        this.svg.$.remove()
    }

    setData (series) {
        this.data = series
        this.setDomains()
        this.makeGrid(series)
        this.redraw()
    }

    highlight (xVal) {
        const el = this.svg.d3.selectAll(".line")
                              .selectAppend("g.guide.point")
        if (xVal) {
            el.datum(s => _.find(s.points, p => this.getXVal(p) === xVal))
            el.translate(p => this.getXY(p))
            el.selectAppend("circle")
              .at("r", 3)
            el.selectAppend("text.value")
              .at("dy", "-1.2em")
              .text(p => this.getPrintVal(p, "y"))
            el.selectAppend("text.label")
              .at("dy", "-2.75em")
              .text(p => this.getPrintVal(p, "x"))
        }
        else el.html("")
    }

    setEvents () {
        const Me = this
        this.svg.d3.on("mousemove", function (e) {
            const pos = d3.mouse(this),
                  range = Me.scale.x.range(),
                  domain = Me.scale.x.domain(),
                  dec = (pos[0] - range[0]) / (range[1] - range[0]),
                  xVal = domain[_.round((domain.length - 1) * dec)]
            Me.highlight(xVal)
        })
        this.svg.d3.on("mouseleave", function (e) {
            Me.highlight()
        })
    }


    //==========//
    //   Axes   //
    //==========//
    setAxes () {
        // Calculate grid size
        const parent = this.$.find(".grid-container"),
              child = this.$.find(".grid-container > *"),
              direction = parent.css("flex-direction"),
              columns = Math.floor(parent.width() / child.outerWidth(true)),
              rows = Math.floor(parent.height() / child.outerHeight(true))

        // Select left-most elements based on direction
        let el = (direction === "column") ?
                    this.svg.d3.filter((d, i) => i < rows) : // Select first column
                    this.svg.d3.filter((d, i) => i % columns === 0) // Select start of every row (default)

        // Only add axes to selected
        const height = this.svg.$.height()
        if (this.axis.x) el.selectAppend("g.xAxis.axis")
                           .call(this.axis.x).translate([0, height])
        if (this.axis.y) el.selectAppend("g.yAxis.axis")
                           .call(this.axis.y)
    }


    //==========//
    //   Grid   //
    //==========//
    makeGrid (series) {
        let el = this.d3.selectAppend("div.grid-container").html("")
                        .appendMany("div.sparkline", series)
        el.selectAppend("h5.title")
          .text(s => s.name)
        el.selectAppend("svg")
          .selectAppend("g.lines")
          .selectAppend("g.line")
          .selectAppend("path")
        this.svg.d3 = this.d3.selectAll("svg")
        this.svg.$ = $(this.svg.d3.nodes())
        this.setEvents()
    }
}

export default SMGrid
