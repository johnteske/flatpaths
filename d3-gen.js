const fs = require("fs");
const path = require("path");
const d3 = require("d3");
const { JSDOM } = require("jsdom");

module.exports = function generate(
  outputLocation = path.join(__dirname, "./test.svg")
) {
  const dom = new JSDOM("");

  // get d3 into the dom
  dom.window.d3 = d3.select(dom.window.document);

  const svg = dom.window.d3
    .select("body")
    .append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .append("g");

  const generateProject = require(path.join(
    __dirname,
    "projects/lightswitch-cover"
  ));
  generateProject(dom.window.d3, svg);

  fs.writeFileSync(outputLocation, dom.window.d3.select("body").html());
};

if (require.main === module) {
  module.exports();
}
