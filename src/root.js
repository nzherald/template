import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

// Polyfill for fetch/promise - only required if using d3-csv on IE<11
// import 'whatwg-fetch'
// import 'promise-polyfill/src/polyfill'

import HTML from "./root.html"
import "./base.less"
import "./root.less"

import Vis from "./lib/baseline.js"
import rawData from "./data/dummy.csv"


class Main {
    constructor () {
        // Clean data
        console.log("Raw data:", rawData)
        let data = this.data = this.cleanData(rawData)
        data = this.filterData(this.data, {
            name: ["Budget 2018", "Labour's Plan"],
            measure: "Health"
        })
        console.log("Cleaned data:", data)

        // Set up visualisation
        $("#root").addClass("nzherald").append(HTML)
        const V = new Vis({
            container: "#root .mainvis",
            scale: {
                x: d3.scalePoint(),
                y: d3.scaleLinear(),
                c: d3.scaleOrdinal(["#2F4285", "#B22A2E", "#7D1A6E"])
                     .domain(["Pre-Election Forecast", "Labour's Plan", "Budget 2018"])
            },
            axis: {
                x: d3.axisBottom().tickPadding(32).tickSize(0),
                y: d3.axisLeft().ticks(3).tickPadding(16).tickSize(4)
            },
            format: {
                val: (d) => d3.format("$.3s")(d).replace(/G/, "B")
            }
        })
        console.log("Visualisation:", V)

        // Populate visualisation
        V.setData(data)
        this.fadeOut()
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

    filterData (data, filter) {
        _.each(filter, (v, k) => {
            if (v instanceof Array) {
                data = _.filter(data, d => v.indexOf(d[k]) !== -1)
            }
            else {
                data = _.filter(data, d => d[k] === v)
            }
        })
        return data
    }

    fadeOut (b) {
        sessionStorage.setItem("loading", "done");
        if (typeof($) !== "undefined") {
            $("#loading").fadeTo(600, 0.01, () => {
                $("#loading").remove()
                console.log("Loading screen removed.")
                if (b) b()
            })
        } else {
            var loadingRemove = document.getElementById("loading")
            if (loadingRemove) {
                document.body.removeChild(loadingRemove)
                console.log("Loading screen removed.")
            }
            if (b) b()
        }
    }
}

new Main()
