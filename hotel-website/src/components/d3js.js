import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import * as d3 from 'd3';
//import { selection, select as d3Select } from 'd3-selection';
import 'd3-transition';
//var d3 = require('d3');
import dataChart from '../data/flare2.json'
class Sunburst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChart: dataChart
    };
  }
  componentDidMount() {
    // D3 Code to create the chart
    // using this._rootNode as container
    // document.getElementById('svg-container').innerHTML = "phong";
    document.getElementById('svg-container').innerHTML = "";
    //let data = this.state.dataChart;
    // let node=this._rootNode;
    let dataflare = this.state.dataChart;
    const width = window.innerWidth,
      height = window.innerHeight,
      maxRadius = Math.min(width, height) / 2 - 5;

    const formatNumber = d3.format(",d");

    const x = d3
      .scaleLinear()
      .range([0, 2 * Math.PI])
      .clamp(true);

    const y = d3.scaleSqrt().range([maxRadius * 0.1, maxRadius]);

    const color = d3.scaleOrdinal(d3.schemeCategory20);
    const partition = d3.partition();

    const arc = d3
      .arc()
      .startAngle(d => x(d.x0))
      .endAngle(d => x(d.x1))
      .innerRadius(d => Math.max(0, y(d.y0)))
      .outerRadius(d => Math.max(0, y(d.y1)));

    const middleArcLine = d => {
      const halfPi = Math.PI / 2;
      const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
      const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

      const middleAngle = (angles[1] + angles[0]) / 2;
      const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
      if (invertDirection) {
        angles.reverse();
      }

      const path = d3.path();
      path.arc(0, 0, r, angles[0], angles[1], invertDirection);
      return path.toString();
    };

    const textFits = d => {
      const CHAR_SPACE = 6;

      const deltaAngle = x(d.x1) - x(d.x0);
      const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
      const perimeter = r * deltaAngle;

      return d.data.name.length * CHAR_SPACE < perimeter;
    };

    const svg = d3
      .select('#svg-container')
      .append("svg")
      //.style("width", "100vw")
      //.style("height", "100vh")
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .on("click", () => focusOn()); // Reset zoom on canvas click

    const root = d3.hierarchy(dataflare);
    root.sum(d => d.size);

    const slice = svg.selectAll("g.slice").data(partition(root).descendants());

    slice.exit().remove();

    const newSlice = slice
      .enter()
      .append("g")
      .attr("class", "slice")
      .on("click", d => {
        d3.event.stopPropagation();
        focusOn(d);
      });

    newSlice.append("title").text(
      d =>
        `${d
          .ancestors()
          .map(d => d.data.name)
          .reverse()
          .join("/")}\n${formatNumber(d.value)}`
    );

    newSlice
      .append("path")
      .attr("class", "main-arc")
      .style("fill", d => color((d.children ? d : d.parent).data.name))
      .attr("d", arc);

    newSlice
      .append("path")
      .attr("class", "hidden-arc")
      .attr("id", (_, i) => `hiddenArc${i}`)
      .attr("d", middleArcLine);

    const text = newSlice
      .append("text")
      .attr("display", d => (textFits(d) ? null : "none"));

    // Add white contour
    text
      .append("textPath")
      .attr("startOffset", "50%")
      .attr("href", (_, i) => `#hiddenArc${i}`)
      .text(d => d.data.name)
      .style("fill", "none")
      .style("stroke", "#fff")
      .style("stroke-width", 5)
      .style("stroke-linejoin", "round");

    text
      .append("textPath")
      .attr("startOffset", "50%")
      .attr("href", (_, i) => `#hiddenArc${i}`)
      .text(d => d.data.name);

    function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
      // Reset to top-level if no data point specified
      const transition = svg
        .transition()
        .duration(750)
        .tween("scale", () => {
          const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
            yd = d3.interpolate(y.domain(), [d.y0, 1]);
          return t => {
            x.domain(xd(t));
            y.domain(yd(t));
          };
        });
      //alert('click ne1');
      transition.selectAll("path.main-arc").attrTween("d", d => () => arc(d));
      //alert('click ne2');
      transition
        .selectAll("path.hidden-arc")
        .attrTween("d", d => () => middleArcLine(d));
      //alert('click ne3');
      transition
        .selectAll("text")
        .attrTween("display", d => () => (textFits(d) ? null : "none"));
      //alert('click ne4');
      moveStackToFront(d);
      //alert('click ne6');

      function moveStackToFront(elD) {
        svg
          .selectAll(".slice")
          .filter(d => d === elD)
          .each(function(d) {
            //alert('click ne5');
            this.parentNode.appendChild(this);
            if (d.parent) {
              moveStackToFront(d.parent);
            }
          });
      }
    }
  }
  shouldComponentUpdate() {
    // Prevents component re-rendering
    return false;
  }
  _setRef(componentNode) {
    this._rootNode = componentNode;
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card>
              <CardHeader>Card title</CardHeader>
              <CardBody>
              <div id="svg-container" className="chart-wrapper"></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Sunburst;
