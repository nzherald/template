/*

Simplemap: Base Mapbox module

Handles all the loading/waiting and hover layer generation. Can be used independently for simple maps.

CAREFUL! This uses a static CSS (https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css). You'll want to update this if you update mapboxgl.

Expected HTML:
<div id="containername"></div>

Usage (see https://www.mapbox.com/mapbox-gl-js/api/):
Simplemap.prototype.getC = function (d) {
    return d.colour
}

new Simplemap({
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
            "fill-opacity": 0.4
        },
        hover : {
            paint : {
                "fill-opacity" : 1,
                "fill-color": "#088",
                "fill-outline-color" : "#999"
            }
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
import turf from "@turf/turf"

import "./mapboxgl.css"
import mapboxgl from "mapbox-gl"


class Simplemap {
    constructor (opt, b) {
        mapboxgl.accessToken = opt.token
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.d3.classed("mapbox", true)
        this.scale = opt.scale

        this.initMap(opt.map, () => {
            this.initSources(opt.sources, () => {
                this.initLayers(opt.layers, b)
                this.popup = new mapboxgl.Popup(opt.popup)
            })
        })
    }


    //===========//
    //  Actions  //
    //===========//
    highlight (id, layer) {
        const exp = ["any"]
        this.highlighted = id
        if (id) exp.push(["==", layer.matchBy, id])
        if (this.selected) exp.push(["==", layer.matchBy, this.selected])
        this.map.setFilter(layer.id + "-hover", exp)
    }

    select (id, layer) {
        if (id === this.selected) {
            this.selected = null
            this.highlight(null, layer)
        }
        else {
            this.selected = id
            this.highlight(id, layer)
        }
    }

    centreTo (id, layer, zoom) {
        zoom = zoom || 14
        const targ = this.getFeature(id, layer)
        const centroid = turf.centroid(targ)
        const center = centroid.geometry.coordinates
        this.map.flyTo({center, zoom})
        this.highlight(id, layer)
    }

    zoomTo (id, layer, padding) {
        const targ = this.getFeature(id, layer)
        const bounds = turf.bbox(targ)
        this.map.fitBounds(bounds, {padding: padding || 50})
        this.highlight(id, layer)
    }


    //==========//
    //   Data   //
    //==========//
    /* CUSTOMISE THIS */
    isValid (s) { return !!s }


    //=========//
    //   Map   //
    //=========//
    // Runs whenever the map is redrawn
    update () {}

    initMap (opt, b) {
        const start = Date.now()
        const onFinish = () => {
            console.log("Map loaded in", Date.now() - start + "ms")
            if (b) b()
        }

        console.log("Loading Mapbox...")
        this.map = new mapboxgl.Map(opt)
        this.map.on("move", () => this.update())
        this.map.on("load", onFinish)
    }

    initSources (sources, b) {
        const start = Date.now()
        const onFinish = () => {
            if (_.every(sources, s => this.map.isStyleLoaded())) {
                console.log("Sources loaded in", Date.now() - start + "ms")
                this.map.off("sourcedata", onFinish)
                if (b) b()
            }
        }
        if (_.isEmpty(sources)) {
            console.log("Warning: No sources specified!")
            return onFinish()
        }
        this.map.on("sourcedata", onFinish)

        this.sources = sources
        _.each(sources, s => {
            console.log("Loading source", s.id + "...")
            this.map.addSource(s.id, _.omit(s, "id"))
        })
    }

    initLayers (layers, b) {
        const start = Date.now()
        const onFinish = () => {
            if (_.every(layers, l => this.map.isStyleLoaded())) {
                console.log("Layers loaded in", Date.now() - start + "ms")
                this.map.off("sourcedata", onFinish)
                if (b) b()
            }
        }
        if (_.isEmpty(layers)) {
            console.log("Warning: No layers specified!")
            return onFinish()
        }
        this.map.on("sourcedata", onFinish)

        this.layers = layers
        _.each(layers, l => {
            console.log("Loading layer", l.id + "...")
            l.matchBy = l.matchBy || "_uid"               // Match by _uid by default
            this.map.addLayer(l, l.insertBefore)          // Add layer
            if (l.hover) this.map.addLayer({              // Add hover layer
                id            : l.id + "-hover",
                source        : l.source,
                "source-layer": l["source-layer"] || "",
                type          : l.type,
                paint         : l.hover.paint,
                filter        : ["==", l.matchBy, ""]
            }, l.insertBefore)

            _.each(l.events, (v, k) => {                  // For each event
                this.map.on(k, l.id, el => v.call(l, el)) // Add to map layer (id is specified)
            })
        })
    }

    getLayer (id) {
        return _.find(this.layers, {id})
    }

    getFeature (id, layer) {
        try {
            const features = layer.data.features
            return _.find(features, f => f.properties[layer.matchBy] == id)
        }
        catch (err) {
            if (err instanceof TypeError) {
                console.error("Features not found! You have to manually provide a GeoJSON collection for each layer.data.features!")
            }
        }
    }

    getProperties (el, path) {
        return _.get(el.features[0].properties, path)
    }

    showPopup (el, html) {
        const f   = el.features[0]
        const centroid = turf.centroid(f)
        const center = centroid.geometry.coordinates
        this.popup.setLngLat(center)
                  .setHTML(html)
                  .addTo(this.map)
    }
}


export default Simplemap
