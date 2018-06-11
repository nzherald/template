/*

BaseLine: Basic line chart library for easy extension

Expected HTML:
<div id="containername">
    <div class="title"></div>
    <svg>
        <g class="xAxis axis"></g>
        <g class="yAxis axis"></g>
        <g class="lines"></g>
    </svg>
</div>

Expected data:
[{
    "series":"Labour's Plan",
    "data":[
        {"period":"2018/19", "val":82858000000},
        {"period":"2019/20", "val":87293000000},
        {"period":"2020/21", "val":91404000000},
        {"period":"2021/22", "val":95756000000}
    ]
},
{
    "series":"Budget 2018",
    "data":[
        {"period":"2018/19", "val":81963000000},
        {"period":"2019/20", "val":86983000000},
        {"period":"2020/21", "val":91720000000},
        {"period":"2021/22", "val":96740000000}
    ]
},
{
    "series":"Labour's Plan",
    "data":[
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
            $: this.$.find("svg"),
            d3: this.d3.select("svg")
        }
        this.format = opt.format
        this.d3.classed("linechart", true)
        this.makeAxes(opt)
        this.setEvents()
    }

    setData (data) {
        this.data = data
        this.setScales(data)
        this.setAxes(this.svg)
        this.makeLines(data)
        this.setLines()
        this.highlight()
    }

    highlight (d, forced) {
        const ct = this.d3.select(".lines"),
              ln = ct.selectAll("g.line")
        this.highlighted = d
        ct.classed("highlighted", !!d)
        ln.classed("selected", d => d === this.selected)
          .classed("highlighted", d => d === this.highlighted)
        ln.filter(".selected").raise()
        ln.filter(".highlighted").raise()
    }

    select (d) {
        this.selected = (this.selected !== d) ? d : null
        this.highlight(d)
    }

    setEvents () {
        this.d3.on("mousemove", () => {
            const pos = d3.mouse(this.svg.d3.node()),
                  d   = this.getClosestLine(pos)
            this.highlight(d)
        })
    }


    //============//
    //   Values   //
    //============//
    getSeries   (d) { return d.series }
    getPeriod   (d) { return d.period }
    getVal      (d) { return d.val }
    getPrintVal (d) { return this.format.val(this.getVal(d))}
    getX        (d) { return this.scale.x(this.getPeriod(d))}
    getY        (d) { return this.scale.y(this.getVal(d))}
    getC        (d) { return this.scale.c(this.getSeries(d))}
    getXY       (d) { return [this.getX(d), this.getY(d)]}


    //==========//
    //   Axes   //
    //==========//
    makeAxes (opt) {
        this.scale = opt.scale
        this.axis = opt.axis
        _.each(this.axis, (axis, k) => axis.scale(this.scale[k]))
        this.axis.y.tickFormat(this.format.val)
        this.lineGen = d3.line().x(d => this.getX(d))
                                .y(d => this.getY(d))
    }

    setScales (data) {
        const dc    = _(data).map("data").flatten(),
              xVals = dc.map(d => this.getPeriod(d))
                        .uniq().sort().value(),
              yVals = dc.map(d => this.getVal(d))
                        .sort().value()
        this.scale.x.domain(xVals)
        this.scale.y.domain(d3.extent(yVals)).nice()
        // this.scale.y.domain([0, _.max(yVals) * 1.2]).nice()
    }

    setAxes (svg) {
        const width  = svg.$.width(),
              height = svg.$.height()
        this.scale.x.range([0, width])
        this.scale.y.range([height, 26])
        this.d3.select(".xAxis").call(this.axis.x).translate([0, height])
        this.d3.select(".yAxis").call(this.axis.y)
    }


    //===========//
    //   Lines   //
    //===========//
    makeLines (data) {
        const ln = this.d3.select(".lines").html("")
                          .appendMany("g.line", data)
        ln.on("mousemove", d => {
            d3.event.stopPropagation()
            this.highlight(d)
        })
        ln.append("path")
        this._addPoints(ln)
        this._addLabel(ln)
    }
    setLines () {
        const ln = this.d3.selectAll(".lines g.line")
        ln.select("path")
          .at("d", d => this.lineGen(d.data))
          .st("stroke", d => this.getC(d))
        this._setPoints(ln)
        this._setLabel(ln)
    }

    _addLabel (el) {
        el.append("text.label").at("dx", "0.8em")
    }
    _setLabel (el) {
        el.select("text.label")
          .translate(d => this.getXY(_.last(d.data)))
          .text(d => this.getSeries(d))
    }

    _addPoints (el) {
        const ct = el.appendMany("g.point", d => d.data)
        ct.raise()
        ct.append("line").at("y2", "-1.15em")
        ct.append("circle").at("r", 5)
        ct.append("text.val").at("dy", "-2em")
    }
    _setPoints (el) {
        el.selectAll("g.point")
          .translate(d => this.getXY(d))
          .select("text.val")
          .text(d => this.getPrintVal(d))
    }

    getClosestLine (pos) {
        const ln      = this.d3.selectAll(".lines g.line"),
              closest = _.minBy(ln.nodes(), l => distToLine(l, pos)),
              dist    = distToLine(closest, pos),
              d       = d3.select(closest).datum()
        return (dist <= 25) ? d : null
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
