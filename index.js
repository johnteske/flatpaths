const fs = require("fs");
const d3 = require("d3");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fakeDom = new JSDOM("<!DOCTYPE html><html><body></body></html>");

const outputLocation = "./output.svg";

const body = d3.select(fakeDom.window.document).select("body");

// Make an SVG Container
const svgContainer = body
  .append("svg")
  .attr("width", 1280)
  .attr("height", 1024);

// Draw a line
let circle = svgContainer
  .append("line")
  .attr("x1", 5)
  .attr("y1", 5)
  .attr("x2", 500)
  .attr("y2", 500)
  .attr("stroke-width", 2)
  .attr("stroke", "black");

// Output the result to file
fs.writeFileSync(outputLocation, body.html());
