import React, { Suspense } from 'react';
import styled from "styled-components"
import useResizeObserver from "use-resize-observer";

const DurationChart = React.lazy(() => import("./duration-chart.tsx"))
const OffenceChart = React.lazy(() => import("./offence-chart"))
const DeltaChart = React.lazy(() => import("./delta-chart"))

const App = styled.div`
.tick-line {
  stroke: rgba(0,0,0,0.2);
}
.axis-baseline {
  stroke: rgba(0,0,0,0.4);
}
.ordinal-labels {
  font-size: 14px;
}
padding-bottom: 18px;
`

const pickChart = (chart, w) => {
  switch (chart) {
    case "offence":
    return <OffenceChart w={w}/>
    case "duration":
      return <DurationChart w={w}/>
    default:
      return <DeltaChart w={w}/>
  }
}

export default ({chart, initialWidth, minHeight = "auto"}) => {
  const { ref, width = initialWidth } = useResizeObserver();
  return (
    <App ref={ref} style={{minHeight}}>
      <Suspense fallback="loading ...">
        {pickChart(chart, width)}
      </Suspense>
    </App>
  )
}

