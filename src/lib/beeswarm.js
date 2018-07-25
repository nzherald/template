import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import "./beeswarm.less"


class Beeswarm {
    constructor (opt) {
        this.$ = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.svg = {
            d3: this.d3.selectAppend("svg"),
            $: this.$.find("svg")
        }
        this.d3.classed("beeswarm", true)

        this.scale = opt.scale || {}
        this.domain = opt.domain || {}
        this.axis = opt.axis || {}
        this.format = opt.format || {}

        this.makeAxes()
        this.makeForce(_.extend({
            chargeStr: -0.2,
            collideStr: 0.6,
            clusterStr: 0.07
        }, opt))
        $(window).on("resize", () => this.redraw())
    }

    setData (data) {
        const width = this.svg.$.width(),
              height = this.svg.$.height()
        _.each(data, d => {
            d.x = d.tx = width * Math.random()
            d.y = d.ty = height * Math.random()
        })
        this.data = data
        this.sim.nodes(data)
        this.setDomains()
        this.makeNodes(data)
        this.redraw()
    }

    redraw () {
        this.onRedraw()
        this.setRanges()
        this.setAxes()
        this.setNodes()
        this.drawNodes()
        this.sim.alpha(1)
        this.sim.restart()
    }

    onRedraw () {} // Placeholder for custom pre-redraw event


    //============//
    //   Values   //
    //============//
    getVal (d, k) {
        return (k === "x") ? this.getXVal(d) :
               (k === "y") ? this.getYVal(d) :
               (k === "r") ? this.getRVal(d) :
               (k === "c") ? this.getCVal(d) :
                             null
    }
    getPrintVal (p, k) {
        let format = this.format[k],
            val = this.getVal(p, k)
        return (format) ? format(val) : val
    }
    getX (d) { return this.scale.x(this.getXVal(d)) }
    getY (d) { return this.scale.y(this.getYVal(d)) }
    getR (d) { return this.scale.r(this.getRVal(d)) }
    getC (d) { return this.scale.c(this.getCVal(d)) }

    // Customise these
    getXVal (d) { return d.xVal }
    getYVal (d) { return d.yVal }
    getRVal (d) { return d.rVal }
    getCVal (d) { return d.cVal }


    //===========//
    //   Force   //
    //===========//
    onTick () {
        this.nodes.at("cx", d => d.x)
                  .at("cy", d => d.y)
    }

    toAnchor (alpha, clusterStr) {
        const delta = alpha * clusterStr
        _.each(this.data, d => {
            d.vx += (d.tx - d.x) * delta
            d.vy += (d.ty - d.y) * delta
        })
    }

    makeForce (opt) {
        this.sim = d3.forceSimulation().stop()
        this.sim.force("charge", d3.forceManyBody().strength(opt.chargeStr))
                .force("collide", d3.forceCollide().strength(opt.collideStr))
                .force("anchor", alpha => this.toAnchor(alpha, opt.clusterStr))
                .on("tick", () => this.onTick())
    }


    //===========//
    //   Nodes   //
    //===========//
    makeNodes (data) {
        this.nodes = this.d3.select(".nodes")
                            .appendMany("g", data)
                            .append("circle")
    }

    setNodes () {
        _.each(this.data, d => {
            let r = this.getR(d),
                x = this.getX(d),
                y = this.getY(d)
            // Invalid node, hide
            if (isNaN(r) || isNaN(x) || isNaN(y)) {
                d.r = 0
            }
            // Coming out of hiding
            else if (d.r === 0) {
                d.r = r
                d.tx = d.x = x // Appear in targ position immediately
                d.ty = d.y = y // Appear in targ position immediately
            }
            // Normal
            else {
                d.r = r
                d.tx = x
                d.ty = y
            }
        })
        this.sim.force("collide").radius(d => d.r + 0.5)
    }

    drawNodes () {
        this.nodes.at("r", d => d.r)
        this.nodes.st("fill", d => this.getC(d))
    }


    //==========//
    //   Axes   //
    //==========//
    makeAxes () {
        _.each(this.axis, (axis, k) => {
            axis.scale(this.scale[k])
            if (this.format[k]) axis.tickFormat(this.format[k])
        })
    }

    setDomains () {
        _.each(this.domain, (domain, k) => {
            let scale = this.scale[k],
                vals = _.map(this.data, d => this.getVal(d, k))
            if (domain === "max") {
                domain = [0, _.max(vals)]
            }
            else if (domain === "extent") {
                domain = d3.extent(vals)
            }
            else if (domain === "vals") {
                domain = _(vals).uniq().filter().sort().value()
            }
            else if (domain instanceof Function) {
                domain = domain(this.data)
            }
            // An array must be provided or produced
            if (domain instanceof Array) {
                scale.domain(domain)
                if (scale.nice) scale.nice()
            }
        })
    }

    setRanges () {
        const width = this.svg.$.width(),
              height = this.svg.$.height()
        this.scale.x.range([0, width])
        this.scale.y.range([height, 0])
    }

    setAxes () {
        if (this.axis.x) this.svg.d3.selectAppend("g.xAxis.axis")
                                    .call(this.axis.x)
        if (this.axis.y) this.svg.d3.selectAppend("g.yAxis.axis")
                                    .call(this.axis.y)
        this.d3.selectAll(".yAxis .tick text").at("x", "0")
        this.d3.selectAll(".yAxis .tick line").at("x1", "0")
                                              .at("x2", "100%")
    }
}

export default Beeswarm
