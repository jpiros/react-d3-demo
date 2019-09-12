import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const Svg = styled.svg`
  height: 600px;
  width: 800px;
  margin: 50px;

  .line {
    fill: none;
    stroke: lightsteelblue;
    stroke-width: 2;
  }

  .overlay {
    fill: none;
    pointer-events: all;
  }

  .area {
    fill: lightsteelblue;
    opacity: 0.5;
  }

  .curtain {
    fill: #f0f2f5;
  }
`;

const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

export default function BarChart() {
  const barChartRef = useRef(null);

  const drawBarChart = () => {
    const n = 21;

    const xScale = d3
      .scaleLinear()
      .domain([0, n - 1])
      .range([50, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height, 50]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const area = d3
      .area()
      .x((d, i) => xScale(i))
      .y0(height)
      .y1(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const dataset = d3.range(n).map(d => ({ y: d3.randomUniform(1)() }));

    const svg = d3.select(barChartRef.current);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(50,0)`)
      .call(d3.axisLeft(yScale));

    svg
      .append("path")
      .datum(dataset)
      .attr("class", "area")
      .attr("d", area);

    svg
      .append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);

    svg
      .append("rect")
      .attr("x", -width)
      .attr("y", -height)
      .attr("height", height)
      .attr("width", width)
      .attr("class", "curtain")
      .attr("transform", "rotate(180)");

    svg
      .append("line")
      .attr("stroke", "#333")
      .attr("stroke-width", 0)
      .attr("class", "guide")
      .attr("x1", 1)
      .attr("y1", 1)
      .attr("x2", 1)
      .attr("y2", 500);

    svg
      .transition()
      .duration(5000)
      .ease(d3.easeLinear)
      .select("rect.curtain")
      .attr("width", 0)
      .select("line.guide")
      .attr("transform", "translate(" + width + ", 0)");
  };

  useEffect(() => {
    if (barChartRef.current) {
      drawBarChart();
    }
  }, [barChartRef]);

  return <Svg ref={barChartRef} />;
}
