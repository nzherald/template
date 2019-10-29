import React, { useState, useRef, useEffect } from "react";
import { useSpring } from "react-spring"
import { drag } from "d3-drag";
import { select, mouse } from "d3-selection";
import { line, curveCatmullRom } from "d3-shape";

import { XYFrame, DividedLine } from "semiotic";

const theme = [
  "#7a255d",
  "#ac58e5",
  "#E0488B",
  "#9fd0cb",
  "#e0d33a",
  "#7566ff",
  "#533f82",
  "#365350",
  "#a19a11",
  "#3f4482"
];


export default ({
  width,
  height,
  lines,
  drawn,
  complete,
  setComplete,
  setDrawn,
  formatter,
  frameProps
}) => {
  const start = 38
  const [end, setEnd] = useState(38)
  useSpring({start: complete ? lines[0].coordinates.length : 38,
    config: {duration: 1000},
    onFrame: ({start}) => setEnd(start)
  })

  const { margin } = frameProps;
  const [drawing, setDrawing] = useState(false);
  const [pos, setPos] = useState([]);
  const ref = useRef();
  useEffect(() => {
    if (ref && ref.current) {
      const dragger = drag()
        .on("start", () => {
          setDrawing(true);
          setPos(mouse(ref.current));
        })
        .on("drag", () => {
          setPos(mouse(ref.current));
        })
        .on("end", () => setDrawing(false));

      select(ref.current).call(dragger);
    }
    // TODO - use complete to remove drag callback
  }, [ref]);

  const thresholdLine = ({ d, xScale, yScale }) => {
    console.log(d)
    const drawnLine = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(curveCatmullRom.alpha(0.5));
    const first = d.data[start];
    const last = d.data[d.data.length - 1];
    if (drawing && !complete) {
      const xDraw = Math.round(xScale.invert(pos[0]) * 4) * 0.25;
      if (xDraw > first.x && xDraw <= last.x) {
        const yDraw = yScale.invert(pos[1]);
        drawn[xDraw] = yDraw;
      }
    }
    const drawArray = Object.entries(drawn)
      .map(([x, y]) => [+x, y])
      .sort();
    const drawPos = drawArray[drawArray.length - 1];
    if (drawPos[0] >= last.x) {
      setDrawn(drawn);
      setComplete(true);
    }
    const drawStartX = xScale(drawPos[0]);
    const drawStartW = xScale(last.x) - xScale(drawPos[0]);
    return (
      <g key={`threshold-${complete}-${end}`}>
        <DividedLine
          data={[d]}
          parameters={(p, i) => {
            if (i <= start) {
              return { stroke: theme[2], fill: "none", strokeWidth: 3 };
            } else if (complete && i < end) {
              return { stroke: theme[0], fill: "none", strokeWidth: 3 };
            }
          }}
          customAccessors={{ x: d => xScale(d.x), y: d => yScale(d.y) }}
          lineDataAccessor={d => d.data}
        />
        <rect
          x={drawStartX}
          width={drawStartW}
          height={height - margin.top - margin.bottom - 1}
          fill="#F2F2F2"
          fillOpacity="0.8"
        />
        <path
          stroke="dimgray"
          strokeWidth="3"
          strokeDasharray="10 6"
          d={drawnLine(drawArray)}
        />
        <circle
          cx={drawStartX}
          cy={yScale(drawPos[1])}
          r="7"
          fill="dimgray"
          style={{ pointer: "cursor" }}
        />
        {drawPos[0] > first.x && !complete && (
          <text x={drawStartX} y={yScale(drawPos[1]) - 20} textAnchor="middle">
            {formatter(drawPos[1])}
          </text>
        )}
      </g>
    );
  };

  return (
    <div>
      <XYFrame
        {...frameProps}
        lines={lines}
        lineType="area"
        customLineMark={thresholdLine}
        size={[width, height]}
        foregroundGraphics={[
          <g
            transform={`translate(${margin.left},${margin.top})`}
            key="interaction"
          >
            <rect
              ref={ref}
              width={width - margin.left - margin.right}
              height={height - margin.top - margin.bottom}
              fill="none"
              pointerEvents="all"
            />
          </g>
        ]}
      />
    </div>
  );
};

