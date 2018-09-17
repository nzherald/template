import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import SVGBeeswarm from "./beeswarm.js"
import "./beeswarm.less"


class Beeswarm extends SVGBeeswarm {
    constructor (opt, b) {
        super(opt)
        this.canvas = {
            d3: this.d3.select(".canvas-container")
                       .selectAppend("canvas.main"),
            $: this.$.find("canvas.main")
        }
        this.svg.$.remove()
        this.svg = this.canvas
    }

    // Disable SVG specific functions
    makeNodes () {}
    drawNodes () {}
    setAxes () {}

    // Actual canvas redraw here
    onTick () {
        const width = this.canvas.$.width(),
              height = this.canvas.$.height(),
              context = this.canvas.d3.node().getContext("2d")
        context.clearRect(0, 0, width, height)
        _.each(this.data, d => {
            if (!d.tx || !d.ty) return // Don't draw invalid nodes
            context.beginPath()
            context.fillStyle = this.getC(d)
            context.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
            context.fill()
        })
    }

    // Canvas needs width/height attributes to scale properly
    setRanges () {
        const width = this.canvas.$.width(),
              height = this.canvas.$.height()
        this.d3.selectAll("canvas")
               .at("width", width)
               .at("height", height)
        this.scale.x.range([0, width])
        this.scale.y.range([height, 0])
    }

    //================//
    //   Clustering   //
    //================//
    clusterBy (key, opt) {
        opt = _.extend({
            chargeStr: -80,
            collideStr: 0.8,
            collideRad: 1.2,
            edgePadding: 40, // Min distance of clusters from the edge
            labels: {
                offset: -0.55,
                arcStart: 0.4,
                arcEnd: -0.58
            }
        }, opt)

        const clusters = this.setClusters(key)
        this.drawClusters(clusters, opt, () => {
            this.setNodes()
            this.drawClusterLabels(clusters, key, opt.labels)
        })
        this.redraw()
    }

    setClusters (key) {
        return _(this.data).groupBy(key).map((v, k) => {
            let c = {
                label: k,
                children: v,
                r: Math.sqrt(v.length * 50 / Math.PI) + 12
            }
            _.each(v, d => d.anchor = c)
            return c
        }).value()
    }

    drawClusterLabels (clusters, key, opt) {
        opt = _.extend({
            font: "1em Stag Book", // Text
            fillStyle: "#666",     // Text
            strokeStyle: "#ccc"    // Line
        }, opt)

        const canvas = this.d3.select("canvas.labels").node(),
              width  = $(canvas).width(),
              height = $(canvas).height(),
              context = canvas.getContext("2d")

        context.clearRect(0, 0, width, height)
        context.font = opt.font
        context.fillStyle = opt.fillStyle
        context.strokeStyle = opt.strokeStyle

        _.each(clusters, d => {
            let labelPoint = addVector(d, opt.offset * Math.PI, d.r)
            context.fillText(d.label, labelPoint.x, labelPoint.y)
            context.beginPath()
            context.arc(d.x, d.y, d.r, opt.arcStart * Math.PI, opt.arcEnd * Math.PI)
            context.stroke()
        })
    }

    // Place nodes using d3-force
    drawClusters (clusters, opt, onTick) {
        const canvas = this.d3.select("canvas.labels").node(),
              width  = $(canvas).width(),
              height = $(canvas).height()
        d3.forceSimulation()
          .force("center",  d3.forceCenter().x(width / 2).y(height / 2))
          .force("charge",  d3.forceManyBody().strength(opt.chargeStr))
          .force("collide", d3.forceCollide().strength(opt.collideStr).radius(d => d.r * opt.collideRad))
          .nodes(clusters)
          .on("tick", () => {
              // Clamp clusters
              _.each(clusters, d => {
                  let padding = d.r + opt.edgePadding
                  d.x = _.clamp(d.x, padding, width - padding)
                  d.y = _.clamp(d.y, padding, height - padding)
              })
              onTick()
          })
    }
}

function addVector (start, offset, dist) {
    return {
        x: start.x + Math.cos(offset) * dist,
        y: start.y + Math.sin(offset) * dist,
    }
}

export default Beeswarm
