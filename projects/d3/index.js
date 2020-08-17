const fs = require("fs");
const d3 = require("d3");
const { JSDOM } = require("jsdom");

const svg = JSDOM.fragment("<svg>").firstChild;

const g = d3
  .select(svg)
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .append("g");

//

const root = require("app-root-path");
const { inches } = require(`${root}/units`);

// function generate(g, d3)

const WIDTH = inches(10);
const DEPTH = inches(5);
const HEIGHT = inches(3);

const cut = selection => {
  // TODO return/type?
  selection.attr("fill", "none").attr("stroke", "black");
};

// horizontal
const horizontal = g.append("g");

horizontal
  .append("rect")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .call(cut);

const notches = [99, 123, 500];

horizontal
  .selectAll("rect.notch")
  .data(notches)
  .enter()
  .append("rect")
  .attr("width", 9)
  .attr("height", HEIGHT / 2)
  .attr("x", d => d)
  .call(cut);

// vertical
const vertical = g.append("g");

vertical
  .append("rect")
  .attr("width", DEPTH)
  .attr("height", HEIGHT)
  .call(cut);

vertical.attr("transform", `translate(0,${HEIGHT})`);

//

const out = svg.outerHTML;

fs.writeFile("out.svg", out, function(err) {
  if (err) throw err;

  console.log("done");
});
