import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";

import data from "./maori-duration.json";

const dotRadius = 8;
const frameProps = {
  data,
  margin: { left: 135, top: 10, bottom: 60, right: 10 },
  type: { type: "point", r: 8 },
  projection: "horizontal",
  oPadding: 10,
  oAccessor: "duration",
  rAccessor: ["y2013", "y2019"],
  rExtent: [0],
  style: (d) => {
    return {
      fill: d.rIndex === 0 ? "#394190" : "#38a3d7",
      stroke: d.rIndex === 0 ? "#394190" : "#38a3d7",
      strokeWidth: 1,
    };
  },
  axes: [{ orient: "bottom", label: "Women remanded each year" }],
  annotations: data,
  svgAnnotationRules: ({ d, rScale, orFrameState }) => {
    const start = rScale(d.y2013) + dotRadius;
    const end = rScale(d.y2019) - dotRadius;
    const y = orFrameState.projectedColumns[d.duration].middle;
    return (
      <line
        key={d.duration}
        x1={start}
        x2={end}
        y1={y}
        y2={y}
        style={{ stroke: "#121617", strokeWidth: 2 }}
      />
    );
  },
  oLabel: (l) => {
    if (l.includes("and")) {
      return (
        <text textAnchor="end">
          {l.split(" and ").map((d, i) => (
            <tspan key={i} x={0} dy={22 * i - 5}>
              {i ? d : d + " and"}
            </tspan>
          ))}
        </text>
      );
    }
    return <text textAnchor="end">{l}</text>;
  },
};

const Chart = styled.div`
  svg {
    max-height: 300px;
    g.axis-title {
      text {
        font-family: "Stag Light";
        transform: translateX(-20px);
      }
    }
  }
`;

export interface ChartProps { w: number; }

export default ({w}) => (
  <Chart>
    <h3>
      How long are Māori women spending on remand?&nbsp;
      <span style={{ color: "#394190" }}>2013</span>&nbsp; vs&nbsp;
      <span style={{ color: "#38a3d7" }}>2019</span>
    </h3>
    <OrdinalFrame {...frameProps} size={[w, 300]} />
  </Chart>
);
