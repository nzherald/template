import React, { Suspense, useState } from "react";
import { format } from "d3-format";
import lines from "./unemployment"

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
     /* To use DrawIt you must pass it drawn/setDrawn from a useState hook.
       The drawn state is a dictionary of points - the first one - which is the last
       known point - should be used initially.

       You also need to pass in a formatter for your numbers - used to render the
       current number while drawing.

       The config needs hideStart and hideEnd - x axis values for portion
       that the reader will draw. The optional value highlight will render
       a dark gray line in addition to whatever semiotic marks you specify.
       But this uses the points mark - so you can't use points with this. 

       Finally pass the semiotic frameprops for an XYFrame you would use. The drawit component
       is expecting that the values will be lines and uses the summary mark to 
       render the user drawn portion. It also assues that the x axis will be years
       and won't let you work at a precision of less than quarters...
      */
    <DrawIt
      drawn={drawn}
      setDrawn={setDrawn}
      formatter={percentage}
      config={{hideStart: 2008.75, hideEnd: 2017.25, highlight: true}}
      frameProps={{...frameProps, size: [width,height]}}
    /></Suspense>
  );
};
