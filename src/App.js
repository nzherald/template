import React, { Suspense, useState, useEffect } from 'react';
import styled from "@xstyled/styled-components"
import axios from 'axios';
import datafile from "./assets/lines-v10.json"

console.log(datafile)

// axios.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.common['crossdomain'] = true;
// axios.defaults.headers.common['crossorigin'] = 'anonymous';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"


const XYFrame = React.lazy(() => import('semiotic/lib/XYFrame'));

const App = styled.div` `

const frameProps = {
  size: [700,400],
  margin: { left: 80, bottom: 50, right: 10, top: 40 },
  defined: function(e){return void 0!==e.pct},
  xAccessor: "month",
  yAccessor: "pct",
  yExtent: [0,100],
  xExtent: [0,20],
  lineDataAccessor: "data",
  pointStyle: { fill: "none", stroke: "none" },
  lineStyle: d => {
    let baseStyles = { stroke: "#E0488B", strokeWidth: "3px" }
    if (!d.forecast) {
      return baseStyles
    } else if (d.forecast === "mean") {
      return { ...baseStyles, strokeDasharray: "5px" }
    } else {
      return { strokeWidth: "0px" }
    }
  },
  title: (
    <text textAnchor="middle">Uncertainty Visualization (Time Series)</text>
  ),
  axes: [{ orient: "left", tickFormat: function(e,t){return 0===t?null:e+"%"}, label: { name: "Decay (%)", position: { anchor: "middle" }, locationDistance: 55 } },
    { orient: "bottom", ticks: 10, tickFormat: function(e,t){return 0===t?"Months":e} }],
  showLinePoints: true,
  hoverAnnotation: true,
  annotations: [{ type: "area", className: "uncertainty_cone", coordinates: [{ month: 15, pct: 21 },
    { month: 16, pct: 18 },
    { month: 17, pct: 15 },
    { month: 18, pct: 10 },
    { month: 18, pct: 38 },
    { month: 17, pct: 30 },
    { month: 16, pct: 25 },
    { month: 15, pct: 21 }] }],
  tooltipContent:  d => {
    let projectionString = null
    if (d.parentLine.forecast) {
      projectionString = (
        <div
          style={{ color: "#E0488B", fontWeight: "bold", marginBottom: "5px" }}
        >{`* ${d.parentLine.forecast} forecast *`}</div>
      )
    }
    return (
      <div
        style={{
          border: `thin solid ${"#E0488B"}`,
          backgroundColor: "white",
          width: "100px",
          textAlign: "center",
          padding: "10px",
          verticalAlign: "middle"
        }}
      >
        {projectionString}
        <div>{`Month: ${d.month}`}</div>
        <div>{`Decay: ${d.pct}%`}</div>
      </div>
    )
  }
}

export default ({basePath}) => {
  const [data, setData] = useState({lines:[], ...frameProps});

  useEffect(() => {
    const fetchData = async () => {
      const lines = await axios(datafile)

      setData({lines:lines.data, ...frameProps})
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <XYFrame {...data} />
      </Suspense>
    </div>
  );
}

