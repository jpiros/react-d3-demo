import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const Svg = styled.div`
  height: 400px;
  width: 600px;
  margin: 50px;
  position: relative;
`;

const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

export default function HeatMap() {
  const heatMapRef = useRef(null);

  const drawHeatMap = () => {
    const svg = d3
      .select(heatMapRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv"
    ).then(data => {
      const xLabels = d3.map(data, d => d.group).keys();
      const yLabels = d3.map(data, d => d.variable).keys();

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(xLabels);

      svg
        .append("g")
        .style("font-size", 12)
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain")
        .remove();

      const y = d3
        .scaleBand()
        .range([height, 0])
        .domain(yLabels);

      svg
        .append("g")
        .style("font-size", 12)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain")
        .remove();

      const myColor = d3
        .scaleSequential()
        .interpolator(d3.interpolateOranges)
        .domain([1, 100]);

      const tooltip = d3
        .select(heatMapRef.current)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#fff")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute");

      const mouseover = function(d) {
        tooltip.style("opacity", 1);
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1);
      };

      const mousemove = function(d) {
        tooltip
          .html(d.value)
          .style("left", `${d3.mouse(this)[0]}px`)
          .style("top", `${d3.mouse(this)[1]}px`);
      };

      const mouseleave = function(d) {
        tooltip.style("opacity", 0);
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8);
      };

      svg
        .selectAll()
        .data(data, d => `${d.group}:${d.variable}`)
        .enter()
        .append("rect")
        .attr("x", d => x(d.group))
        .attr("y", d => y(d.variable))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => myColor(d.value))
        .style("stroke-width", 1)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
    });
  };

  useEffect(() => {
    if (heatMapRef.current) {
      drawHeatMap();
    }
  }, [heatMapRef]);

  return <Svg ref={heatMapRef}></Svg>;
}
