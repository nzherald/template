/*

BaseLine: Basic line chart library for easy extension

Expected HTML:
<div id="containername">
    <h3 class="title"></h3>
    <svg>
        <g class="xAxis axis"></g>
        <g class="yAxis axis"></g>
        <g class="lines"></g>
    </svg>
</div>

Expected data:
[{
    "name":"Labour's Plan",
    "points":[
        {"period":"2018/19", "val":82858000000},
        {"period":"2019/20", "val":87293000000},
        {"period":"2020/21", "val":91404000000},
        {"period":"2021/22", "val":95756000000}
    ]
},
{
    "name":"Budget 2018",
    "points":[
        {"period":"2018/19", "val":81963000000},
        {"period":"2019/20", "val":86983000000},
        {"period":"2020/21", "val":91720000000},
        {"period":"2021/22", "val":96740000000}
    ]
},
{
    "name":"Labour's Plan",
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
import "./baseline.less"


class BaseLine {
    constructor (opt) {
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.svg = {
            d3: this.d3.selectAppend("svg"),
            $: this.$.find("svg")
        }
        this.d3.classed("linechart", true)

        this.scale  = opt.scale || {}
        this.domain = opt.domain || {}
        this.axis   = opt.axis || {}
        this.format = opt.format || {}

        this.makeAxes()
        this.setEvents()
    }

    setData (series) {
        this.checkData(series)
        this.data = series
        this.setDomains()
        this.makeElements(series)
        this.redraw()
    }

    redraw () {
        this.preRedraw()
        this.setRanges()
        this.setAxes()
        this.setElements()
        this.highlight()
        this.postRedraw()
    }

    highlight (s, p) {
        const ct = this.d3.select(".lines"),
              ln = ct.selectAll("g.line")
        this.highlighted = s
        ct.classed("highlighted", !!s)
        ln.classed("selected", s => s === this.selected)
          .classed("highlighted", s => s === this.highlighted)
        ln.filter(".selected").raise()
        ln.filter(".highlighted").raise()
        this.onHighlight(s, p)
    }

    select (s) {
        this.selected = (this.selected !== s) ? s : null
        this.highlight(s)
    }

    setEvents () {
        this.svg.d3.on("mousemove", () => {
            const pos = d3.mouse(this.svg.d3.node())
            const s = this.getClosestLine(pos)
            const p = this.getClosestPoint(s, pos)
            this.highlight(s, p)
        })
    }

    onHighlight () {}
    preRedraw () {} // Placeholder for custom pre-redraw event
    postRedraw () {} // Placeholder for custom post-redraw event


    //============//
    //   Values   //
    //============//
    checkData (series) {
        if (series instanceof Array === false) {
            throw "Data must be in the form of an array"
        }
        if (!_.every(series, s => s.points)) {
            throw "Each series must contain an array of points"
        }
    }

    getVal (d, k) {
        return (k === "x") ? this.getXVal(d) :
               (k === "y") ? this.getYVal(d) :
               (k === "c") ? this.getCVal(d) :
                             null
    }
    getPrintVal (p, k) {
        let format = this.format[k],
            val = this.getVal(p, k)
        return (format) ? format(val) : val
    }
    getX    (p) { return this.scale.x(this.getXVal(p)) }
    getY    (p) { return this.scale.y(this.getYVal(p)) }
    getC    (p) { return this.scale.c(this.getCVal(p)) }
    getXY   (p) { return [this.getX(p), this.getY(p)] }

    // Customise these
    isValid (p) {
        return p &&
               !isNaN(this.getX(p)) &&
               !isNaN(this.getY(p))
    }
    getXVal (p) { return p.xVal || p.period }
    getYVal (p) { return p.yVal || p.val }
    getCVal (p) { return p.name }


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
            let vals, scale = this.scale[k]
            if (domain instanceof Function) {
                domain = domain(this.data)
            }
            else {
                vals = _(this.data).map("points").flatten()
                                   .map(d => this.getVal(d, k))
                if (domain === "max") {
                    domain = [0, vals.max()]
                }
                else if (domain === "extent") {
                    domain = d3.extent(vals.value())
                }
                else if (domain === "vals") {
                    domain = vals.uniq().filter().sort().value()
                }
            }
            // An array must be provided or produced
            if (domain instanceof Array) {
                scale.domain(domain)
                if (scale.nice) scale.nice()
            }
        })
    }

    setRanges () {
        const width  = this.svg.$.width(),
              height = this.svg.$.height()
        this.scale.x.range([0, width])
        this.scale.y.range([height, 0])
    }

    setAxes () {
        const height = this.svg.$.height()
        if (this.axis.x) this.svg.d3.selectAppend("g.xAxis.axis")
                                    .call(this.axis.x).translate([0, height])
        if (this.axis.y) this.svg.d3.selectAppend("g.yAxis.axis")
                                    .call(this.axis.y)
    }


    //===========//
    //   Lines   //
    //===========//
    // Default d3 line gen, will cry when bad values are given
    lineGen (points) {
        return d3.line().x(p => this.getX(p))
                        .y(p => this.getY(p))(points)
    }

    // Alternative line gen, will pretend bad values didn't exist
    lineGenIgnore (points) {
        return "M" + _(points).map(p => [this.getX(p), this.getY(p)])
                              .reject(p => isNaN(p[0]) || isNaN(p[1]))
                              .map(p => _.round(p[0]) + "," + _.round(p[1]))
                              .value().join("L")
    }

    // Alternative line gen, will skip over bad values
    lineGenSkip (points) {
        let prevValid = false
        return _.reduce(points, (str, p) => {
            const x = this.getX(p),
                  y = this.getY(p)
            // currVal is invalid, ignore
            if (isNaN(x) || isNaN(y)) {
                prevValid = false
                return str
            }
            // currVal is valid and prevVal is also valid, continue
            else if (prevValid) {
                prevValid = true
                return str + "L" + _.round(x) + "," + _.round(y)
            }
            // currValue is valid but prevVal is NOT valid, start new line
            else {
                prevValid = true
                return str + "M" + _.round(x) + "," + _.round(y)
            }
        }, "")
    }

    makeElements (series) {
        const el = this.svg.d3.selectAppend("g.lines").html("")
                              .appendMany("g.line", series)
        el.append("path")
        this.addPoints(el)
        this.addLabel(el)
    }
    setElements () {
        const el = this.d3.selectAll(".lines g.line")
        el.select("path").at("d", s => this.lineGen(s.points))
        if (this.scale.c) {
            el.select("path").st("stroke", s => this.getC(s))
        }
        this.setPoints(el)
        this.setLabel(el)
    }

    addLabel (el) {
        el.selectAppend("text.label")
    }
    setLabel (el) {
        el.select("text.label")
          .at("dx", "0.8em")
          .translate(s => this.getXY(_.last(s.points)))
          .text(s => this.getCVal(s))
    }

    addPoints (el) {
        const ct = el.appendMany("g.point", s => s.points)
        ct.raise()
        ct.append("line").at("y2", "-1.15em")
        ct.append("circle").at("r", 5)
        ct.append("text.val").at("dy", "-2em")
    }
    setPoints (el) {
        el.selectAll("g.point")
          .translate(p => this.getXY(p))
          .select("text.val")
          .text(p => this.getPrintVal(p, "y"))
    }

    getClosestLine (pos) {
        const ln      = this.d3.selectAll(".lines g.line"),
              closest = _.minBy(ln.nodes(), l => distToLine(l, pos)),
              dist    = distToLine(closest, pos)
        return (dist <= 25) ? d3.select(closest).datum() : null
    }

    getClosestPoint (s, pos) {
        if (!s) return
        return _.minBy(s.points, p => {
            const dx = this.getX(p) - pos[0]
            const dy = this.getY(p) - pos[1]
            return dx * dx + dy * dy;
        })
    }
}

export default BaseLine


// Some crazy Mike Bostok shit
function closestPoint(pathNode, point) {
    var pathLength = pathNode.getTotalLength(),
        precision = 8,
        best,
        bestLength,
        bestDistance = Infinity;
    // linear scan for coarse approximation
    for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
            best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
    }
    // binary search for precise estimate
    precision /= 2;
    while (precision > 0.5) {
        var before,
            after,
            beforeLength,
            afterLength,
            beforeDistance,
            afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
            best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
            best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
            precision /= 2;
        }
    }
    best = [best.x, best.y];
    best.distance = Math.sqrt(bestDistance);
    return best;
    function distance2(p) {
        var dx = p.x - point[0],
            dy = p.y - point[1];
        return dx * dx + dy * dy;
    }
}
function distToLine (line, point) {
    const p = d3.select(line).select("path").node()
    return closestPoint(p, point).distance
}
