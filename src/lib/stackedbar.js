/*

Stacked bar: Stacked bar chart

Expected HTML:
<div id="containername">
    <h3 class="title"></h3>
    <svg>
        <g class="xAxis axis"></g>
        <g class="yAxis axis"></g>
        <g class="bars"></g>
    </svg>
</div>

Expected data:
[{
}]

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import BaseLine from "./baseline.js"
import "./stackedbar.less"


class StackedBar extends BaseLine {
    constructor (opt) {
        super(opt)
        this.d3.classed("bar", true)
        this.d3.classed("stackedbar", true)
    }

    highlight (p) {
        const ct = this.d3.select(".bars"),
              ln = ct.selectAll("g.segment")
        this.highlighted = p
        ct.classed("highlighted", !!p)
        ln.classed("selected", p => p === this.selected)
          .classed("highlighted", p => p === this.highlighted)
        ln.filter(".selected").raise()
        ln.filter(".highlighted").raise()
        this.onHighlight(p)
    }

    setEvents () {}

    //============//
    //   Values   //
    //============//
    getXVal (p) { return p.series }
    getYVal (p) { return p.val }
    getCVal (p) { return p.name }


    //==========//
    //   Axes   //
    //==========//
    setDomains () {
        _.each(this.domain, (domain, k) => {
            let vals, scale = this.scale[k]
            if (domain instanceof Function) {
                domain = domain(this.data)
            }
            else if (domain === "max") {
                vals = _(this.data).map(d => _.sumBy(d.points, "val"))
                domain = [0, vals.max()]
            }
            else if (domain === "vals") {
                vals = _(this.data).map("points").flatten()
                                   .map(d => this.getVal(d, k))
                domain = vals.uniq().filter().sort().value()
            }
            // An array must be provided or produced
            if (domain instanceof Array) {
                scale.domain(domain)
                if (scale.nice) scale.nice()
            }
        })
    }


    //==========//
    //   Bars   //
    //==========//
    makeElements (series) {
        this.stackData(series)
        const el = this.svg.d3.selectAppend("g.bars").html("")
                              .appendMany("g.bar", series)
                              .appendMany("g.segment", s => s.points)
        el.append("rect")
        el.on("click", p => this.select(p))
        el.on("mouseenter", p => this.highlight(p))
        this.addLabel(el)
    }
    setElements () {
        const scale = this.scale
        const el = this.d3.selectAll(".bar")
        el.translate(s => [scale.x(s.name), 0])
          .selectAll("rect")
          .at("y", p => scale.y(p.endVal))
          .at("height", p => scale.y(p.startVal) - scale.y(p.endVal))
          .at("width", scale.x.bandwidth())

        if (scale.c) {
            el.selectAll("rect").st("fill", s => this.getC(s))
        }
        this.setLabel(el)
    }

    stackData (series) {
        _.each(series, s => {
            let stacked = 0
            _.each(this.scale.c.domain(), k => {
                const p = _.find(s.points, {name: k})
                p.startVal = stacked
                stacked += p.val
                p.endVal = stacked
            })
        })
    }

    setLabel (el) {
        const scale = this.scale
        el.selectAll("text.label")
          .at("x", scale.x.bandwidth() / 2)
          .at("y", p => scale.y((p.endVal + p.startVal) / 2))
          .text(p => this.getPrintVal(p, "y"))
    }
}

export default StackedBar
