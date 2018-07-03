/*

PlayFish: Playfair style hybrid line-area chart

Expected HTML:
<div id="containername">
    <div class="title"></div>
    <svg>
        <g class="clipPaths"></g>
        <g class="xAxis axis"></g>
        <g class="yAxis axis"></g>
        <g class="lines"></g>
        <g class="areas"></g>
    </svg>
</div>

Expected data:
[{
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
import BaseLine from "./baseline.js"
import "./baseline.less"
import "./playfish.less"


class PlayFish extends BaseLine {
    constructor (opt) {
        super(opt)
        this.d3.classed("playfish", true)
        this.areaGen = d3.area().x(d => this.getX(d))
                                .y0(d => this.scale.y.range()[0])
                                .y1(d => this.getY(d))
        this.maskGen = d3.area().x(d => this.getX(d))
                                .y0(d => this.scale.y.range()[1])
                                .y1(d => this.getY(d))
    }

    setData (series) {
        this.data = series
        if (series.length != 2) throw "PlayFish can only handle two data series!"
        series[0].mask = series[1] // Use its counterpart as the mask to get the difference
        series[1].mask = series[0] // Use its counterpart as the mask to get the difference
        this.setScales(series)
        _.each(this.scale.x.domain(), period => {
            var a = _.find(series[0].points, {period}),
                b = _.find(series[1].points, {period})
            a.gt = this.getVal(a) >= this.getVal(b)
            b.gt = !a.gt
        })

        this.setAxes(this.svg)
        this.makeDiffArea(series)
        this.setDiffArea()
        this.makeLines(series)
        this.setLines()
        this.highlight()
    }


    //==========//
    //   Area   //
    //==========//
    makeDiffArea (series) {
        function asID (name) {return name.replace(/[\ \']/g, "")}

        this.d3.select(".clipPaths").html("")
               .appendMany("clipPath", series)
               .at("id", s => asID(s.name))
               .append("path")
        this.d3.select(".areas").html("")
               .appendMany("g.area", series)
               .append("path")
               .at("clip-path", s => "url(#" + asID(s.mask.name) + ")")
               .st("fill", s => this.getC(s))
    }

    setDiffArea () {
        this.d3.selectAll("clipPath path")
               .at("d", s => this.maskGen(s.points))
        this.d3.selectAll("g.area path")
               .at("d", s => this.areaGen(s.points))
    }

    // Flip labels for the lower line
    addPoints (el) {
        const ct = el.appendMany("g.point", s => s.points)
        ct.raise()
        ct.append("line").at("y2", p => (p.gt) ? "-0.85em" : "0.85em")
        ct.append("text.val").at("dy", p => (p.gt) ? "-1.8em" : "1.8em")
        ct.append("circle").at("r", 4)
    }
}

export default PlayFish
