/*

Chaosladder: Ranked list with animated reordering

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import "./chaosladder.less"


class ChaosLadder {
    constructor (opt) {
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.d3.classed("chaosladder", true)
        this.format = opt.format
    }

    setData (series, maxCount, t) {
        let el = this.d3.selectAll("div.row")
        series = this.rankData(series, maxCount)
        const jn = el.data(series, d => this.getId(d))

        // Stop animating and record current positions
        // This must be done AFTER data assignment, but BEFORE new elements are inserted
        el.interrupt().each(function (d) {
            const el = $(this)
            d.currTop = el.position().top
            d.currRank = el.find("div.rank").text()
            d.currVal = el.find("div.value").text()
        })

        // Create/remove elements
        jn.join(
            enter => this.makeRow(enter),
            update => {},
            exit => exit.remove()
        )

        // Set new order, which moves it to new position
        el = this.d3.selectAll("div.row")
        el.style("order", d => d.rank)

        // Set up enter/update for redraw
        jn.join(
            enter => {
                const el = enter.selectAll("div.row")
                el.st("opacity", 0)
                el.translate([-40, 0])
            },
            update => {
                const el = update
                el.st("z-index", 1)
                el.st("opacity", 1)
                el.translate(function (d) { return [0, d.currTop - this.offsetTop] })// Add offset, which brings it back to old position)
            }
        )

        // Redraw
        const tr = el.transition().duration(t)
        tr.st("opacity", 1)
        tr.translate([0, 0]) // 0, 0 will result in element appearing in its expected position, as defined by order
        tr.select("div.rank").textTween(d => itp(d.currRank || d.rank, d.rank, ".0f"))
        tr.select("div.value").textTween(d => itp(d.currVal, this.getVal(d), this.format))
    }

    highlight (d) {
        const el = this.d3.selectAll("div.row")
        el.classed("highlighted", e => e === d)
        this.onHighlight(d)
    }

    select (d) {
        const el = this.d3.selectAll("div.row")
        el.filter(".selected").each(e => d = (d === e) ? null : d)
        el.classed("selected", e => e === d)
        this.onSelect(d)
    }

    onHighlight () {}
    onSelect () {}


    //============//
    //   Values   //
    //============//
    getId (d) { return d.name }
    getName (d) { return d.name }
    getVal (d) { return d.val }

    // Sort and assign ranks
    rankData (series, maxCount) {
        series = _(series).sortBy("rank") // Sort by existing rank
                          .sortBy(d => -this.getVal(d) || Infinity) // Descending sort by value
                          .uniqBy(d => this.getId(d)).value()
        _.each(series, (d, i) => d.rank = i + 1)
        if (maxCount) series = series.slice(0, maxCount)
        return series
    }


    //==========//
    //   Rows   //
    //==========//
    makeRow (sl) {
        const el = sl.append("div.row")
        el.append("div.rank").text(s => s.rank)
        el.append("div.name").text(s => this.getName(s))
        el.append("div.value")
        el.on("click", d => this.select(d))
        el.on("mouseenter", d => this.highlight(d))
        el.on("mouseleave", d => this.highlight())
        return el
    }
}

// Generic interpolator with d3 format
function itp (curr, targ, format) {
    return t => {
        if (targ == null || isNaN(targ)) return "-"
        if (curr == null || isNaN(curr)) curr = 0
        return d3.format(format)(curr * (1 - t) + targ * t)
     }
}


export default ChaosLadder
