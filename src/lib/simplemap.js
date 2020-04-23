import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import * as turf from "@turf/turf"

// CAREFUL! This uses a static CSS (https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css)
// You'll want to update this if you update mapboxgl
import "./mapboxgl.css"
import "./simplemap.less"
import mapboxgl from "mapbox-gl"


class Simplemap {
    constructor (opt, b) {
        mapboxgl.accessToken = opt.token
        this.$  = $(opt.container)
        this.d3 = d3.select(opt.container)
        this.d3.classed("simplemap", true)
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
    highlight (f) {
        if (this.highlighted) {
            this.map.setFeatureState(this.highlighted, {hover: false})
        }
        if (f) {
            this.map.setFeatureState(f, {hover: true})
        }
        this.highlighted = f
    }

    select (f) {
        if (this.selected) {
            this.map.setFeatureState(this.selected, {hover: false, selected: false})
        }
        if (f && this.selected && f.id === this.selected.id) {
            f = null
        }
        if (f) {
            this.map.setFeatureState(f, {hover: true, selected: true})
        }
        this.selected = f
    }

    showPopup (f, html) {
        const center = turf.centroid(f).geometry.coordinates
        this.popup.setLngLat(center)
                  .setHTML(html)
                  .addTo(this.map)
    }

    centreTo (f, zoom) {
        const center = turf.centroid(f).geometry.coordinates
        this.map.flyTo({center, zoom: zoom || 14})
        this.highlight(f)
    }

    zoomTo (f, padding) {
        const bounds = turf.bbox(f)
        this.map.fitBounds(bounds, {padding: padding || 50})
        this.highlight(f)
    }

    zoomToLayer (layer, padding) {
        const features = layer.data.features
        const collection = turf.featureCollection(features)
        const bounds = turf.bbox(collection)
        this.map.fitBounds(bounds, {padding: padding || 50})
    }


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
        this.map.on("move", (e) => {
            this.lastEvent = e
            setTimeout(() => {
                if (e === this.lastEvent) this.update()
            }, 25)
        })
        this.map.once("load", onFinish)
    }

    initSources (sources, b) {
        const start = Date.now()
        const onFinish = () => {
            if (_.every(sources, s => this.map.isSourceLoaded(s.id))) {
                console.log("Sources loaded in", Date.now() - start + "ms")
                if (b) b()
                this.map.off("sourcedata", onFinish)
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
            if (this.map.isStyleLoaded()) {
                console.log("Layers loaded in", Date.now() - start + "ms")
                if (b) b()
                this.map.off("sourcedata", onFinish)
            }
        }
        if (_.isEmpty(layers)) {
            console.log("Warning: No layers specified!")
            return onFinish()
        }
        // DO NOT CHANGE THIS - You need "sourcedata" here!
        // "styledata" fires when the style is loaded, but before the elements are rendered
        // This means that anything which relies on queryRenderedFeatures will fail
        // The "sourcedata" event fires multiple times as each tile is loaded AFTER styling
        // So when "sourcedata" is fired AND map.isStyleLoaded() is true, that's when rendering is really finished
        this.map.on("sourcedata", onFinish)

        this.layers = layers
        _.each(layers, l => {
            console.log("Loading layer", l.id + "...")
            const source = _.find(this.sources, {id: l.source})
            l.data = l.data || source.data
            this.map.addLayer(l, l.insertBefore)
            _.each(l.events, (v, k) => this.map.on(k, l.id, v))
        })
    }

    getLayer (id) {
        return _.find(this.layers, {id})
    }

    // Only works when map is rendered from data
    getFeatures (query, layer) {
        if (typeof layer === "string") layer = this.getLayer(layer)
        return _(layer.data.features).filter(f => _.isMatch(f.properties, query))
                                     .map(f => _.extend({source: layer.source}, f))
                                     .value()
    }

    // Mostly here to translate MapboxGL filter expressions into something not stupid
    getRenderedFeatures (query, layer) {
        const filter = ["all"]
        _.each(query, (v, k) => filter.push(["==", k, v]))
        return this.map.queryRenderedFeatures({layers: [layer], filter})
    }

    // Get data for a feature
    getData (f, layer) {
        layer = layer || _.find(this.layers, {id: f.layer.id})
        const id = f.properties[layer.matchBy]
        const data = _.find(layer.data, d => d[layer.matchBy] == id)
        if (!data) console.warn("No data found for " + id)
        return data
    }

    // Functions for checking data should work with sources/layers
    checkSourceData (s) {
        console.log("Checking data for source", s.id + "...")
        _(s.data.features).find(f => {
            if (f.id == null) throw "IDs missing on some/all features. Give integer IDs to features!"
            if (typeof f.id === "string") throw "IDs must be integers not strings. Give integer IDs to features!"
        })
        console.log("Data for source", s.id, "is okay.")
    }

    checkLayerData (l) {
        console.log("Checking data for layer", l.id + "...")
        const d = l.data[0]
        if (!d[l.matchBy]) throw "layer.matchBy is set to '" + l.matchBy + "' but data elements do not have this property!"
        if (!d.points) {
            if (!d.hasOwnProperty("val")) throw "Data elements must have a 'points' property (for series) or a 'val' (for single points)!"
        }
        else {
            const p = d.points[0]
            if (!p.hasOwnProperty("period")) throw "Points must have a 'period' property!"
            else if (!p.hasOwnProperty("val")) throw "Points must have a 'val' property!"
        }
        console.log("Data for layer", l.id, "is okay.")

        const features = this.map.queryRenderedFeatures({layers: [l.id]})
        if (!features.length) console.warn("Cannot check " + l.id + " - no rendered features available.")
        else if (!_.has(features[0].properties, l.matchBy)) throw "layer.matchBy is set to '" + l.matchBy + "' but features in " + l.id + " do not have this property!"
        console.log("Features for layer", l.id, "is okay.")
    }
}


export default Simplemap
