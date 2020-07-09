const fs = require("fs");
const path = require("path");
const d3 = require("d3");
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;

function go(outputLocation = path.join(__dirname, "./test.svg")) {
  const dom = new JSDOM("");

  // get d3 into the dom
  dom.window.d3 = d3.select(dom.window.document);

  const svg = dom.window.d3
    .select("body")
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .append("g");

  svg
    .append("rect")
    .attr("width", 99)
    .attr("height", 99)
    .attr("fill", "none")
    .attr("stroke", "#000000");

  //using sync to keep the code simple
  fs.writeFileSync(outputLocation, dom.window.d3.select("body").html());
}

go();
