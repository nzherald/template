import React, { useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';

import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
import ece from "./assets/ece.geojson"

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN; // Set your mapbox token here

const initialViewport = {
      latitude: -36.845,
      longitude: 174.735,
      // zoom: 9.89,
      zoom: 12.5,
      bearing: 0,
      pitch: 0
    }

const App = props => {
  const [viewport, setViewport] = useState(initialViewport)
  console.log(viewport)
  return (
    <div>
      <h2>A Map</h2>
    <MapGL
        {...viewport}
        width="100%"
        height="520px"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
      <Source
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={11}
          clusterRadius={50}
        >
        <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
      </Source>
      </MapGL>
      </div>
  )
}

export default App
