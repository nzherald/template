import React, { Suspense } from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";

const frameProps = {
  data: [
    { name: "Remand", color: "#394190", year: 2013, value: 98 },
    { name: "Remand", color: "#394190", year: 2019, value: 300 },
    { name: "Sentenced", color: "#38a3d7", year: 2013, value: 406 },
    { name: "Sentenced", color: "#38a3d7", year: 2019, value: 375 },
  ],
  margin: { left: 60, top: 15, bottom: 15, right: 50 },
  type: {
    type: "point",
    r: function () {
      return 8;
    },
  },
  rExtent: [0],
  connectorType: function (e) {
    return e.name;
  },
  oAccessor: "year",
  rAccessor: "value",
  style: function (e) {
    return { fill: e.color, stroke: "white", strokeOpacity: 0.5 };
  },
  connectorStyle: function (e) {
    return {
      fill: e.source.color,
      stroke: e.source.color,
      strokeOpacity: 0.5,
      fillOpacity: 0.5,
    };
  },
  axes: [
    { orient: "left", baseline: false, label: { name: "Prison population" } },
    { baseline: false, orient: "right" },
  ],
  oLabel: true,
};

const Chart = styled.div`
svg {
  height: 150px;
  max-height: 150px;
}
`;

export default ({w}) => {
   
  return (
    <Chart>
        <h3>Why were women behind bars? 2013 vs 2019</h3>
        <h4><span style={{color: "#394190"}}>On remand</span> and <span style={{color: "#38a3d7"}}>sentenced</span></h4>
      <OrdinalFrame {...frameProps} size={[w,150]} />
    </Chart>
  );
};
