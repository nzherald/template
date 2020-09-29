import ENV from "Environment"
import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import Base from "./lib/base.js"
import { appWarn } from "./lib/util.js"
import HTML from "./root.html"
import "./root.less"

import Vis from "./lib/baseline.js"
import rawData from "./data/dummy.csv"


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector, HTML)
        const V = new Vis({
            container: "#nzh-datavis-root",
            scale: {
                x: d3.scalePoint(),
                y: d3.scaleLinear(),
                c: d3.scaleOrdinal(["#2F4285", "#B22A2E", "#7D1A6E"])
            },
            domain: {
                x: "vals",
                y: "max",
                c: ["Pre-Election Forecast", "Labour's Plan", "Budget 2018"]
            },
            axis: {
                x: d3.axisBottom().tickPadding(32).tickSize(0),
                y: d3.axisLeft().ticks(3).tickPadding(16).tickSize(4)
            },
            format: {
                y: (d) => d3.format("$.3s")(d).replace(/G/, "B")
            }
        })
        console.log("Visualisation:", V)

        // Clean data
        console.log("Raw data:", rawData)
        let data = rawData
        data = _.filter(data, {measure: "Health"})
        data = _.filter(data, d => d.scenario === "Budget 2018" || d.scenario === "Labour's Plan")
        data = this.data = this.cleanData(data)
        console.log("Cleaned data:", data)

        // Populate visualisation
        this.premiumWait(() => {
            V.setData(data)
            console.log("Done.")
            //this.fadeOut()
            if (params.appWarn) {
                appWarn(this.root.selector, params.appWarn, params.category)
            }
        })
    }

    cleanData (rawData) {
        const years = ["2018/19", "2019/20", "2020/21", "2021/22"]
        return _.map(rawData, row => {
            return {
                name: row.scenario,
                measure: row.measure,
                points: _.map(years, y => {
                    return {period: y, val: row[y] * 1000000}
                })
            }
        })
    }
}

window.Main = window.UniqClassName = Main
