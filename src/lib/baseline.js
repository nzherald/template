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
            $: this.$.find("svg"),
            d3: this.d3.select("svg")
        }
        this.format = opt.format
        this.format.val = this.format.val || d3.format("")
        this.format.period = this.format.period || d3.format("")
        this.d3.classed("linechart", true)
        this.makeAxes(opt)
        this.setEvents()
    }

    setData (series) {
        this.data = series
        this.setScales(series)
        this.setAxes(this.svg)
        this.makeLines(series)
        this.setLines()
        this.highlight()
    }

    highlight (s, forced) {
        const ct = this.d3.select(".lines"),
              ln = ct.selectAll("g.line")
        this.highlighted = s
        ct.classed("highlighted", !!s)
        ln.classed("selected", s => s === this.selected)
          .classed("highlighted", s => s === this.highlighted)
        ln.filter(".selected").raise()
        ln.filter(".highlighted").raise()
    }

    select (s) {
        this.selected = (this.selected !== s) ? s : null
        this.highlight(s)
    }

    setEvents () {
        this.d3.on("mousemove", () => {
            const pos = d3.mouse(this.svg.d3.node()),
                  s   = this.getClosestLine(pos)
            this.highlight(s)
        })
    }


    //============//
    //   Values   //
    //============//
    isValid        (p) { return p && !isNaN(this.getX(p)) && !isNaN(this.getY(p)) }
    getName        (s) { return s.name }
    getPeriod      (p) { return p.period }
    getVal         (p) { return p.val }
    getPrintPeriod (p) { return this.format.period(this.getPeriod(p)) }
    getPrintVal    (p) { return this.format.val(this.getVal(p)) }
    getX           (p) { return this.scale.x(this.getPeriod(p)) }
    getY           (p) { return this.scale.y(this.getVal(p)) }
    getC           (p) { return this.scale.c(this.getName(p)) }
    getXY          (p) { return [this.getX(p), this.getY(p)] }


    //==========//
    //   Axes   //
    //==========//
    makeAxes (opt) {
        this.scale = opt.scale
        this.axis = opt.axis
        _.each(this.axis, (axis, k) => axis.scale(this.scale[k]))
        if (this.axis.y) this.axis.y.tickFormat(this.format.val)
    }

    setScales (series) {
        const points = _(series).map("points").flatten(),
              xVals  = points.map(p => this.getPeriod(p))
                             .uniq().sort().value(),
              yVals  = points.map(p => this.getVal(p))
                             .sort().value()
        this.scale.x.domain(xVals)
        // this.scale.y.domain(d3.extent(yVals)).nice()
        this.scale.y.domain([0, _.max(yVals) * 1.2]).nice()
    }

    setAxes (svg) {
        const width  = svg.$.width(),
              height = svg.$.height()
        this.scale.x.range([0, width])
        this.scale.y.range([height, 26])
        if (this.axis.x) svg.d3.selectAppend("g.xAxis.axis")
                               .call(this.axis.x).translate([0, height])
        if (this.axis.y) svg.d3.selectAppend("g.yAxis.axis")
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

    makeLines (series) {
        const el = this.svg.d3.selectAppend(".lines").html("")
                              .appendMany("g.line", series)
        el.on("mousemove", s => {
              d3.event.stopPropagation()
              this.highlight(s)
          })
          .append("path")
        this.addPoints(el)
        this.addLabel(el)
    }
    setLines () {
        const el = this.d3.selectAll(".lines g.line")
        el.select("path").at("d", s => this.lineGen(s.points))
        if (this.scale.c) {
            el.select("path").st("stroke", s => this.getC(s))
        }
        this.setPoints(el)
        this.setLabel(el)
    }

    addLabel (el) {
        el.selectAppend("text.label").at("dx", "0.8em")
    }
    setLabel (el) {
        el.select("text.label")
          .translate(s => this.getXY(_.last(s.points)))
          .text(s => this.getName(s))
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
          .text(p => this.getPrintVal(p))
    }

    getClosestLine (pos) {
        const ln      = this.d3.selectAll(".lines g.line"),
              closest = _.minBy(ln.nodes(), l => distToLine(l, pos)),
              dist    = distToLine(closest, pos)
        return (dist <= 25) ? d3.select(closest).datum() : null
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
