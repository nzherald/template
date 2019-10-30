import React, { Suspense, useState } from "react";
import { format } from "d3-format";

const DrawIt = React.lazy(() => import('./DrawIt'));


const theme = [
  "#7a255d",
  "#E0488B",
  "#ac58e5",
  "#9fd0cb",
  "#e0d33a",
  "#7566ff",
  "#533f82",
  "#365350",
  "#a19a11",
  "#3f4482"
];
const percentage = format(".0%");
const margin = { left: 40, bottom: 40, right: 40, top: 40 };

const lines = [
  {
    title: "Labour",
    visible: true,
    coordinates: [
      {
        year: 2000,
        value: 0.062
      },
      {
        year: 2000.25,
        value: 0.068
      },
      {
        year: 2000.5,
        value: 0.063
      },
      {
        year: 2000.75,
        value: 0.059
      },
      {
        year: 2001,
        value: 0.056
      },
      {
        year: 2001.25,
        value: 0.058
      },
      {
        year: 2001.5,
        value: 0.054
      },
      {
        year: 2001.75,
        value: 0.052
      },
      {
        year: 2002,
        value: 0.054
      },
      {
        year: 2002.25,
        value: 0.057
      },
      {
        year: 2002.5,
        value: 0.052
      },
      {
        year: 2002.75,
        value: 0.054
      },
      {
        year: 2003,
        value: 0.049
      },
      {
        year: 2003.25,
        value: 0.054
      },
      {
        year: 2003.5,
        value: 0.047
      },
      {
        year: 2003.75,
        value: 0.044
      },
      {
        year: 2004,
        value: 0.046
      },
      {
        year: 2004.25,
        value: 0.047
      },
      {
        year: 2004.5,
        value: 0.041
      },
      {
        year: 2004.75,
        value: 0.037
      },
      {
        year: 2005,
        value: 0.036
      },
      {
        year: 2005.25,
        value: 0.043
      },
      {
        year: 2005.5,
        value: 0.037
      },
      {
        year: 2005.75,
        value: 0.037
      },
      {
        year: 2006,
        value: 0.036
      },
      {
        year: 2006.25,
        value: 0.045
      },
      {
        year: 2006.5,
        value: 0.036
      },
      {
        year: 2006.75,
        value: 0.037
      },
      {
        year: 2007,
        value: 0.036
      },
      {
        year: 2007.25,
        value: 0.042
      },
      {
        year: 2007.5,
        value: 0.035
      },
      {
        year: 2007.75,
        value: 0.034
      },
      {
        year: 2008,
        value: 0.032
      },
      {
        year: 2008.25,
        value: 0.042
      },
      {
        year: 2008.5,
        value: 0.037
      },
      {
        year: 2008.75,
        value: 0.039
      }
    ]
  },
  {
    title: "National",
    visible: false,
    coordinates: [
      {
        year: 2008.75,
        value: 0.039
      },
      {
        year: 2009,
        value: 0.043
      },
      {
        year: 2009.25,
        value: 0.054
      },
      {
        year: 2009.5,
        value: 0.056
      },{
        year: 2009.75,
        value: 0.06
      },
      {
        year: 2010,
        value: 0.063
      },
      {
        year: 2010.25,
        value: 0.063
      },
      {
        year: 2010.5,
        value: 0.064
      },
      {
        year: 2010.75,
        value: 0.059
      },
      {
        year: 2011,
        value: 0.06
      },
      {
        year: 2011.25,
        value: 0.063
      },
      {
        year: 2011.5,
        value: 0.058
      },
      {
        year: 2011.75,
        value: 0.058
      },
      {
        year: 2012,
        value: 0.059
      },
      {
        year: 2012.25,
        value: 0.066
      },
      {
        year: 2012.5,
        value: 0.062
      },
      {
        year: 2012.75,
        value: 0.066
      },
      {
        year: 2013,
        value: 0.062
      },
      {
        year: 2013.25,
        value: 0.06
      },
      {
        year: 2013.5,
        value: 0.058
      },
      {
        year: 2013.75,
        value: 0.057
      },
      {
        year: 2014,
        value: 0.055
      },
      {
        year: 2014.25,
        value: 0.058
      },
      {
        year: 2014.5,
        value: 0.051
      },
      {
        year: 2014.75,
        value: 0.052
      },
      {
        year: 2015,
        value: 0.054
      },
      {
        year: 2015.25,
        value: 0.057
      },
      {
        year: 2015.5,
        value: 0.053
      },
      {
        year: 2015.75,
        value: 0.055
      },
      {
        year: 2016,
        value: 0.049
      },
      {
        year: 2016.25,
        value: 0.055
      },
      {
        year: 2016.5,
        value: 0.049
      },
      {
        year: 2016.75,
        value: 0.048
      },
      {
        year: 2017,
        value: 0.052
      },
      {
        year: 2017.25,
        value: 0.052
      }
    ]
  }
];

const frameProps = {
  lines,
  lineType: "area",
  yExtent: [0, 0.1],
  margin: margin,
  xAccessor: "year",
  yAccessor: "value",
  title: <text textAnchor="middle">Unemployment Rate in New Zealand</text>,
  axes: [{ orient: "left", tickFormat: percentage }, { orient: "bottom" }],
  lineStyle: (d, i) => ({
    stroke: theme[i],
    strokeOpacity: 0.8,
    strokeWidth: 1,
    fill: theme[i],
    fillOpacity: 0.8,
    clipPath: !d.visible && "url(#superclip)"
  })
};
export default () => {
  const width = Math.min(700, window.innerWidth-20);
  const height = 400;
  const [drawn, setDrawn] = useState({ "2008.75": 0.039 });
  const [complete, setComplete] = useState(false);
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <DrawIt
      drawn={drawn}
      setDrawn={setDrawn}
      complete={complete}
      setComplete={setComplete}
      formatter={percentage}
      config={{hideStart: 2008.75, hideEnd: 2017, highlight: true}}
      frameProps={{...frameProps, size: [width,height]}}
    /></Suspense>
  );
};
