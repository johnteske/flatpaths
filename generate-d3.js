const fs = require("fs");
const d3 = require("d3");
const { JSDOM } = require("jsdom");

const svg = JSDOM.fragment("<svg>").firstChild;

const g = d3
  .select(svg)
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .append("g");

// TODO select a particular project
const project = require("./projects/d3");

project(g);

const out = svg.outerHTML;

fs.writeFile("out.svg", out, function(err) {
  if (err) throw err;

  console.log("done");
});
