/*

Choropleth: Complex interactive choropleth

Special map for which regenerates layer client-side on render to facilitate user interaction (time sliders etc).
Colour is the only value which is manipulable.

CAREFUL! This uses a static CSS (https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css). You'll want to update this if you update mapboxgl.

Expected HTML:
<div id="containername"></div>

Usage (see https://www.mapbox.com/mapbox-gl-js/api/):
new Choropleth({
    token: [TOKEN],
    map: {
        container : "mapbox",
        style     : "mapbox://styles/nzherald/cjcy52sw11rmg2tms1of6hy2z",
        center    : [174.81, -41.318],
        zoom      : 13
    },
    sources: [{
        id: "mainsrc",
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: [FEATURES]
        }
    }],
    layers: [{
        matchBy: [KEY OF PROPERTY TO MATCH BY], // IMPORTANT: Defaults to _uid, which must be set on the data for highlight/select to work
        id: "main",
        type: "fill",
        source: "mainsrc",
        paint: {
            "fill-color": "#088",
            "fill-opacity": ["case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.4
            ]
        },
        events : {
            mouseleave : function (el) {},
            mousemove  : function (el) {},
            click  : function (el) {}
        }
    }],
    popup: {
        closeOnClick: false,
        anchor: 'bottom-left'
    }
}, () => {
    this.fadeOut()
})

*/

import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"

import Simplemap from "./simplemap.js"


class Choropleth extends Simplemap {
    constructor (opt, b) {
        super(opt, b)
        this.setPeriod(opt.period)
        this.d3.classed("choropleth", true)
    }

    setPeriod (period) {
        if (!period) {
            console.log("No period defined, going to basic mode.")
            this.getVal = this.getBasicVal
        }
        else if (typeof period == String) {
            console.log("Setting period to:", period)
            this.period = period
            this.getVal = this.getCurrVal
        }
        else if (period instanceof Array) {
            console.log("Setting period to:", period[0], "to", period[1])
            this.period = period
            this.getVal = this.getChange
        }
        else {
            console.error("Invalid period format:", period)
        }
    }

    // Bind data to layer
    setData (layerName, data) {
        const layer = _.find(this.layers, {id: layerName})
        layer.data = data
        this.checkData(data)
        this.updateLayer(layer)
    }

    // Check that data is consistent with mode
    checkData (data) {
        const d = data[0]
        if (this.period) {
            if (!d.points) {
                console.error("Data elements must have a 'points' property (an array containing points)!")
            }
            else if (!d.points[0].hasOwnProperty("period")) {
                console.error("Points must have a 'period' property!")
            }
            else if (!d.points[0].hasOwnProperty("val")) {
                console.error("Points must have a 'val' property!")
            }
            else {
                console.log("Data looks right.")
            }
        }
        else {
            if (!d.hasOwnProperty("val")) {
                console.error("Data elements must have a 'val' property!")
            }
            else {
                console.log("Data looks right.")
            }
        }
    }

    // Update will trigger on move - regenerate layers because only visible elements are generated
    update () {
        // var start = new Date()
        _.each(this.layers, layer => this.updateLayer(layer))
        // console.log(new Date() - start)
    }

    // CUSTOMISE THIS - when layer is updated, colour is recalculated
    // Default mode: data = [{id:"a", val:1}, {id:"b", val:1}, {id:"c", val:5}]
    getBasicVal (d) {
        return _.find(d.val)
    }
    // Longitudinal modes: data = [{id:"a", points:[{date: "2019-01-01", val: 1}, {date: "2019-02-01", val: 5}]}]
    getBaseVal (s) {
        return _.find(s.points, {period: this.period[0]}).val
    }
    getCurrVal (s) {
        return _.find(s.points, {period: this.period[1]}).val
    }
    getChange (s) {
        const cVal = this.getCurrVal(s)
        const bVal = this.getBaseVal(s)
        const dec  = (bVal && cVal) ? cVal / bVal - 1 : 0
        return dec
    }

    getC (d) {
        const val = this.getVal(d)
        return this.scale.c(val)
    }
    isValid (d) { return !!d && this.getVal(d) != null }
    setDomain (domain) {
        const scale = this.scale.c
        const data = this.data
        if (domain) scale.domain(domain)
        else {
            // Dynamically set scale
            const max = _(data).map(s => _(s.points).map(p => p[this.measure]).max())
                               .filter().sortBy(v => v * 1)
                               .nth(-5) // Ignore outliers
            scale.domain([0, max]).nice()
        }
    }

    // Generate a Mapbox expression for all the visible features in a layer using getC
    updateLayer (layer) {
        const exp      = ["match", ["get", layer.matchBy]]
        const features = this.map.queryRenderedFeatures({layers: [layer.id]}) // Find all the rendered features in this layer
        layer.live = []                                                       // Reset dictionary for storing data of rendered features
        if (!features.length) return                                          // No features selected, quit
        _(features).uniqBy(f => f.properties[layer.matchBy]).each(f => {      // Iterate through each unique feature
            const id = f.properties[layer.matchBy]                            // Extract ID from feature
            const d = this.getData(f)
            if (!d) console.warn("Cannot find data for:", id)
            else if (!this.isValid(d)) console.warn("Invalid data for:", id)
            else {
                exp.push(id, this.getC(d)) // Calculate colour and push to expression
                layer.live.push(d)         // Save data to dictionary of rendered features
                _.assign(d, f.properties)  // Push feature properties back into data (for pop-ups)
            }
        })
        _.each([this.selected, this.highlighted], f => {
            if (!f) return
            const id = f.properties[layer.matchBy]
            const d  = _.find(layer.data, {id})
            layer.live.push(d)
        })

        if (exp.length <= 2) exp.push(0, "rgba(0,0,0,0)")                     // No data - add placeholder
        exp.push("rgba(0,0,0,0)")                                             // Must add default colour to end of expression
        this.map.setPaintProperty(layer.id, "fill-color", exp)                // Paint base layer using expression
    }
}


export default Choropleth
