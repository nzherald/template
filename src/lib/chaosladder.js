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
        if (opt.title) this.setTitle(opt.title)
    }

    setTitle (title) {
        this.d3.selectAppend("div.title")
            .text(title)
            .style("order", 0)
    }

    setData (series, maxCount, t) {
        const Me = this
        let el = this.d3.selectAppend("div.main").selectAll("div.row")
        el.interrupt()

        // Save current values
        const oldData = {}
        el.each(function (d) {
            const id = Me.getId(d)
            oldData[id] = {
                _oldTop: $(this).position().top,
                _oldVal: d._val,
                _oldRank: d._rank
            }
        })

        // Sort
        series = _(series).sortBy("rank") // Sort by existing rank
                          .sortBy(d => -this.getVal(d) || Infinity) // Descending sort by value
                          .uniqBy(d => this.getId(d)) // Filter out duplicates - do after sort
                          .slice(0, maxCount)
                          .value()

        // Populate
        _.each(series, (d, i) => {
            d._id = this.getId(d)
            d._val = this.getVal(d)
            d._rank = i + 1
            _.extend(d, oldData[d._id])
        })

        // Create/remove elements
        const jn = el.data(series, d => d._id)
        jn.join(
            enter => this.makeRow(enter),
            update => {},
            exit => exit.remove()
        )

        // Set new order, which moves it to new position
        el = this.d3.selectAll("div.row")
        el.style("order", d => d._rank)

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
                el.translate(function (d) { return [0, d._oldTop - this.offsetTop] }) // Add offset, which brings it back to old position)
            }
        )

        // Redraw
        const tr = el.transition().duration(t)
        tr.st("opacity", 1)
        tr.translate([0, 0]) // 0, 0 will result in element appearing in its expected position, as defined by order
        tr.select("div.rank").textTween(d => itp(d._oldRank || d._rank, d._rank, ".0f"))
        tr.select("div.value").textTween(d => itp(d._oldVal, d._val, this.format))
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
