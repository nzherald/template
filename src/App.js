import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'
import lines from './unemployment'

const DrawIt = React.lazy(() => import('./DrawIt'))

const theme = [
  '#7a255d',
  '#E0488B',
  '#ac58e5',
  '#9fd0cb',
  '#e0d33a',
  '#7566ff',
  '#533f82',
  '#365350',
  '#a19a11',
  '#3f4482'
]
const percentage = format('.0%')
const margin = { left: 40, bottom: 40, right: 40, top: 40 }

const frameProps = {
  lines,
  lineType: 'area',
  yExtent: [0, 0.1],
  margin: margin,
  xAccessor: 'year',
  yAccessor: 'value',
  title: <text textAnchor="middle">Unemployment Rate in New Zealand</text>,
  axes: [{ orient: 'left', tickFormat: percentage }, { orient: 'bottom' }],
  lineStyle: (d, i) => ({
    stroke: theme[i],
    strokeOpacity: 0.8,
    strokeWidth: 1,
    fill: theme[i],
    fillOpacity: 0.8
  })
}

const App = ({ basePath, tag }) => {
  const width = Math.min(700, window.innerWidth - 20)
  const height = 400
  const [drawn, setDrawn] = useState({ 2008.75: 0.039 })
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <DrawIt
        tag={tag}
        drawn={drawn}
        setDrawn={setDrawn}
        formatter={percentage}
        config={{ hideStart: 2008.75, hideEnd: 2017.25, highlight: true }}
        frameProps={{ ...frameProps, size: [width, height] }}
      /></Suspense>
  )
}

App.propTypes = {
  basePath: PropTypes.string,
  tag: PropTypes.string
}

export default App
