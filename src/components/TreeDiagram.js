import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const Svg = styled.div`
  height: 800px;
  width: 600px;
  margin: 50px;
  position: relative;

  .link {
    fill: none;
  }

  .border {
    fill: none;
    shape-rendering: crispEdges;
    stroke: #aaa;
  }

  .node {
    stroke: #fff;
  }
`;

const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const width = 600 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

export default function TreeDiagram() {
  const treeDiagramRef = useRef(null);

  const drawTreeDiagram = () => {
    const data = {
      name: "Top Level",
      parent: "null",
      count: 23,
      status: "critical",
      icon: {
        class: "far",
        code: "\uf24d"
      },
      children: [
        {
          name: "Level 2: A",
          parent: "Top Level",
          count: 23,
          status: "critical",
          icon: {
            class: "fas",
            code: "\uf1c0"
          },
          children: [
            {
              name: "Son of A",
              parent: "Level 2: A",
              count: 23,
              status: "critical",
              icon: {
                class: "fas",
                code: "\uf0c2"
              }
            },
            {
              name: "Daughter of A",
              parent: "Level 2: A",
              count: 23,
              status: "warning",
              icon: {
                class: "far",
                code: "\uf192"
              }
            }
          ]
        },
        {
          name: "Level 2: B",
          parent: "Top Level",
          count: 23,
          status: "warning",
          icon: {
            class: "far",
            code: "\uf192"
          }
        }
      ]
    };

    const orientations = {
      "bottom-to-top": {
        size: [height, width],
        x: function(d) {
          return d.x;
        },
        y: function(d) {
          return d.y;
        }
      }
    };

    const hexagonData = d => {
      const h = Math.sqrt(3) / 2;
      const radius = 50;
      return [
        { x: radius + d.x, y: d.y },
        { x: radius / 2 + d.x, y: radius * h + d.y },
        { x: -radius / 2 + d.x, y: radius * h + d.y },
        { x: -radius + d.x, y: d.y },
        { x: -radius / 2 + d.x, y: -radius * h + d.y },
        { x: radius / 2 + d.x, y: -radius * h + d.y }
      ];
    };

    const drawHexagon = d3
      .line()
      .x(function(d) {
        return d.x;
      })
      .y(function(d) {
        return d.y;
      })
      .curve(d3.curveCardinalClosed.tension(0.9));

    const svg = d3
      .select(treeDiagramRef.current)
      .selectAll("svg")
      .data(d3.entries(orientations))
      .enter()
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.each(function(orientation) {
      const svg = d3.select(this);
      const o = orientation.value;

      const treemap = d3.tree().size(o.size);
      let nodes = d3.hierarchy(data);
      nodes = treemap(nodes);
      const links = nodes.descendants().slice(1);

      svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d => {
          return (
            "M" + d.x + "," + o.y(d) + "L" + d.parent.x + "," + o.y(d.parent)
          );
        })
        .attr("stroke", d =>
          d.data.status === "critical" ? "#FF575E" : "#FFAF6B"
        )
        .attr("stroke-width", d =>
          d.data.status === "critical" ? "6px" : "4px"
        );

      const node = svg
        .selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g");

      node
        .append("path")
        .attr("d", d => drawHexagon(hexagonData(d)))
        .attr("stroke", "#4d4d4d")
        .attr("stroke-width", 4)
        .attr("fill", "#2b2b2b");

      node
        .append("text")
        .text(d => d.data.name)
        .attr("x", d => d.x - 5)
        .attr("dx", 5)
        .attr("y", d => d.y + 75)
        .style("text-anchor", "middle");

      node
        .append("text")
        .attr("class", d => d.data.icon.class)
        .style("font-size", "24px")
        .style("fill", "#4d4d4d")
        .text(d => d.data.icon.code)
        .attr("x", d => d.x - 5)
        .attr("dx", 5)
        .attr("y", d => d.y + 10)
        .style("text-anchor", "middle");
    });
  };

  useEffect(() => {
    if (treeDiagramRef.current) {
      drawTreeDiagram();
    }
  }, [treeDiagramRef]);

  return <Svg ref={treeDiagramRef}></Svg>;
}
