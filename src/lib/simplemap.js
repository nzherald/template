import _ from "lodash"
import $ from "jquery"
import * as d3 from "d3"
import * as d3jetpack from "d3-jetpack"
import * as turf from "@turf/turf"

// CAREFUL! This uses a static CSS (https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css)
// You'll want to update this if you update mapboxgl
import "./mapboxgl.css"
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

            _(s.data.features).find(f => {
                if (f.id == null) {
                    console.error("IDs missing on some/all features. Give integer IDs to features!")
                    return true
                }
                if (typeof f.id === "string") {
                    console.error("IDs must be integers not strings. Give integer IDs to features!")
                    return true
                }
            })
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
            const source = _.find(this.sources, {id: l.source})
            l.data = source.data
            this.map.addLayer(l, l.insertBefore)
            _.each(l.events, (v, k) => this.map.on(k, l.id, v))
        })
    }

    getLayer (id) {
        return _.find(this.layers, {id})
    }

    getFeature (query, layer) {
        if (typeof layer === "string") layer = this.getLayer(layer)
        const source = layer.source
        const features = layer.data.features
        return _.extend(
            {source},
            _.find(features, f => _.isMatch(f.properties, query))
        )
    }
}


export default Simplemap
