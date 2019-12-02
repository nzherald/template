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
        this.d3.classed("choropleth", true)
    }

    // Bind data to layer
    setData (layerName, data, b) {
        const layer = _.find(this.layers, {id: layerName})
        layer.data = data
        this.updateLayer(layer, b)
    }

    // Update will trigger on move - regenerate layers because only visible elements are generated
    update () {
        // var start = new Date()
        _.each(this.layers, layer => this.updateLayer(layer))
        // console.log(new Date() - start)
    }

    // CUSTOMISE THIS - when layer is updated, colour is recalculated
    getC (d) { return this.scale.c(d.val) }
    isValid (d) { return !!s }

    // Generate a Mapbox expression for all the visible features in a layer using getC
    updateLayer (layer) {
        const exp      = ["match", ["get", layer.matchBy]]
        const features = this.map.queryRenderedFeatures({layers: [layer.id]}) // Find all the rendered features in this layer
        layer.live = []                                                       // Reset dictionary for storing data of rendered features
        if (!features.length) return                                          // No features selected, quit

        _(features).uniqBy(f => f.properties[layer.matchBy]).each(f => {      // Iterate through each unique feature
            const id = f.properties[layer.matchBy]                            // Extract ID from feature
            const d = this.getData(f)
            if (!this.isValid(d)) return                                      // No data for this feature, quit
            exp.push(id, this.getC(d))                                        // Calculate colour and push to expression
            layer.live.push(d)                                                // Save data to dictionary of rendered features
            _.assign(d, f.properties)                                         // Push feature properties back into data (for pop-ups)
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
