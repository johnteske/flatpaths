const fs = require("fs");
const path = require("path");
const d3 = require("d3");
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;

const chartWidth = 500;
const chartHeight = 500;

const arc = d3
  .arc()
  .outerRadius(chartWidth / 2 - 10)
  .innerRadius(0);

const colours = [
  "#98abc5",
  "#8a89a6",
  "#7b6888",
  "#6b486b",
  "#a05d56",
  "#d0743c",
  "#ff8c00"
];
function go(
  pieData = [12, 31],
  outputLocation = path.join(__dirname, "./test.svg")
) {
  const dom = new JSDOM("");

  dom.window.d3 = d3.select(dom.window.document); //get d3 into the dom

  const svg = dom.window.d3
    .select("body")
    .append("div")
    .attr("class", "container") //make a container div to ease the saving process
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("g")
    .attr(
      "transform",
      "translate(" + chartWidth / 2 + "," + chartWidth / 2 + ")"
    );

  svg
    .selectAll(".arc")
    .data(d3.pie()(pieData))
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill", (d, i) => colours[i])
    .attr("stroke", "#fff");

  //using sync to keep the code simple
  fs.writeFileSync(outputLocation, dom.window.d3.select(".container").html());
}

go();
