import React, { useState, useRef, useEffect } from "react";
import { useSpring } from "react-spring";
import { drag } from "d3-drag";
import { select, mouse } from "d3-selection";
import { line, curveCatmullRom } from "d3-shape";
import styled from "@xstyled/styled-components";

import { XYFrame } from "semiotic";

const Pulse = styled.circle`
  fill: white;
  fill-opacity: 0;
  animation-duration: 2s;
  animation-name: pulse;
  animation-iteration-count: infinite;
  cursor: pointer;
  stroke: dimgray;
  stroke-width: 2px;
  stroke-opacity: 1;

  @keyframes pulse {
    from {
      stroke-width: 3px;
      stroke-opacity: 1;
      transform: scale(0.3);
    }
    to {
      stroke-width: 0;
      stroke-opacity: 0;
      transform: scale(2);
    }
  }
`;

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
  drawn,
  complete,
  setComplete,
  setDrawn,
  formatter,
  config,
  frameProps
}) => {
  const { margin, size, lines, yExtent } = frameProps;
  const [width, height] = size;
  const [end, setEnd] = useState(config.hideStart);
  useSpring({
    start: complete ? config.hideEnd : config.hideStart,
    config: { duration: 1000 },
    onFrame: ({ start }) => setEnd(start)
  });

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

  const thresholdLine = (num, params) => {
    const { xScale, yScale } = params;
    const drawArray = Object.entries(drawn)
      .map(([x, y]) => [+x, y])
      .sort();
    const drawPos = drawArray[drawArray.length - 1];
    const drawStartX = xScale(drawPos[0]);
    const drawStartW = xScale(config.hideEnd) - xScale(drawPos[0]);

    const drawnLine = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(curveCatmullRom.alpha(0.5));
    if (drawing && !complete) {
      const xDraw = Math.round(xScale.invert(pos[0]) * 4) * 0.25;
      if (xDraw > config.hideStart && xDraw <= config.hideEnd) {
        const yDraw = yScale.invert(pos[1]);
        drawn[xDraw] = yDraw;
      }
    }
    if (drawPos[0] >= config.hideEnd) {
      setDrawn(drawn);
      setComplete(true);
    }
    return (
      <g key="draw">
        <clipPath id="superclip">
          <rect
            x={xScale(config.hideStart)}
            width={xScale(end) - xScale(config.hideStart)}
            height={height - margin.top - margin.bottom - 1}
          ></rect>
        </clipPath>
        <rect
          x={drawStartX}
          width={drawStartW}
          height={height - margin.top - margin.bottom - 1}
          fill="#D2D2D2"
          fillOpacity="0.8"
        />
        <path
          stroke="dimgray"
          strokeWidth="3"
          strokeDasharray="10 6"
          d={drawnLine(drawArray)}
        />
        <g transform={`translate(${drawStartX},${yScale(drawPos[1])})`}>
          <circle r="7" fill="dimgray" />
          {!complete && <Pulse r="8" fill="dimgray" />}
        </g>
        {drawPos[0] > config.hideStart && !complete && (
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
        summaries={[
          {
            coordinates: [
              { year: 2009.75, value: yExtent[0] },
              { year: 2017.75, value: yExtent[1] }
            ]
          }
        ]}
        customSummaryMark={p => thresholdLine(lines.length, p)}
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
