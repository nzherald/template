import React, { Suspense, useState } from "react";
import { format } from "d3-format";

import DrawIt from "./DrawIt";

const percentage = format(".0%");
const margin = { left: 80, bottom: 90, right: 10, top: 40 };


const lines = [
  {
    title: "Quarterly",
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
      },
      {
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
  yExtent: [0, 0.1],
  margin: margin,
  xAccessor: "year",
  yAccessor: "value",
  title: <text textAnchor="middle">Unemployment Rate in New Zealand</text>,
  axes: [{ orient: "left", tickFormat: percentage }, { orient: "bottom" }]
};
export default () => {
  const width = Math.min(700, window.innerWidth);
  const height = 400;
  const [drawn, setDrawn] = useState({ "2009.5": 0.056 });
  const [complete, setComplete] = useState(false);
  return (
    <DrawIt
      lines={lines}
      width={width}
      height={height}
      drawn={drawn}
      setDrawn={setDrawn}
      complete={complete}
      setComplete={setComplete}
      formatter={percentage}
      frameProps={frameProps}
    />
  );
};
