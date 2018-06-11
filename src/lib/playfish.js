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

    setData (data) {
        this.data = data
        if (data.length != 2) throw "PlayFish can only handle two data series!"
        data[0].mask = data[1] // Use its counterpart as the mask to get the difference
        data[1].mask = data[0] // Use its counterpart as the mask to get the difference
        this.setScales(data)
        _.each(this.scale.x.domain(), period => {
            var a = _.find(data[0].data, {period}),
                b = _.find(data[1].data, {period})
            a.gt = a.val >= b.val
            b.gt = !a.gt
        })

        this.setAxes(this.svg)
        this.makeDiffArea(data)
        this.setDiffArea()
        this.makeLines(data)
        this.setLines()
        this.highlight()
    }


    //==========//
    //   Area   //
    //==========//
    makeDiffArea (data) {
        function asID (d) {return d.series.replace(/[\ \']/g, "")}

        this.d3.select(".clipPaths").html("")
               .appendMany("clipPath", data)
               .at("id", d => asID(d))
               .append("path")
        this.d3.select(".areas").html("")
               .appendMany("g.area", data)
               .append("path")
               .at("clip-path", d => "url(#" + asID(d.mask) + ")")
               .st("fill", (d, i) => this.getC(d))
    }

    setDiffArea () {
        this.d3.selectAll("clipPath path")
               .at("d", d => this.maskGen(d.data))
        this.d3.selectAll("g.area path")
               .at("d", d => this.areaGen(d.data))
    }

    // Flip labels for the lower line
    _addPoints (el) {
        const ct = el.appendMany("g.point", d => d.data)
        ct.raise()
        ct.append("line").at("y2", d => (d.gt) ? "-0.85em" : "0.85em")
        ct.append("text.val").at("dy", d => (d.gt) ? "-1.8em" : "1.8em")
        ct.append("circle").at("r", 4)
    }
}

export default PlayFish
