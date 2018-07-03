/*

Hairball: Dense line chart which relies heavily on dynamic filtering

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
import BaseLine from "./baseline.js"
import "./hairball.less"


class Hairball extends BaseLine {
    constructor (opt, b) {
        super(opt)
        this.d3.classed("hairball", true)
    }

    highlight (s) {
        const ct = this.d3.select(".lines"),
              ln = ct.selectAll("g.line")
        this.highlighted = s
        ct.classed("highlighted", !!s)
        ln.classed("selected", s => s === this.selected)
          .classed("highlighted", s => s === this.highlighted)

        // Only add points on highlight/select for performance reasons
        ln.selectAll(".point").remove()
        ln.filter(".selected, .highlighted").raise()
          .call(el => this.addPoints(el))
    }

    //=============//
    //  Rendering  //
    //=============//
    makeLines (data) {
        this.d3.select(".lines").html("")
               .appendMany("g.line", data)
               .append("path")
    }
    setLines () {
        this.d3.selectAll(".lines g.line")
               .select("path")
               .at("d", s => this.lineGen(s.points))
    }
}

export default Hairball
