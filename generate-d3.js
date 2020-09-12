const fs = require("fs");
const d3 = require("d3");
const { JSDOM } = require("jsdom");
const path = require("path");

module.exports = function(projectType, project, cb) {
  const svg = JSDOM.fragment("<svg>").firstChild;

  const g = d3
    .select(svg)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .append("g");

  const projectPath = `./${projectType}s/${project}`;
  require(projectPath)(d3, g);

  const out = svg.outerHTML;

  const file = path.resolve(`${projectPath}/out.svg`);
  fs.writeFile(file, out, function(err) {
    if (err) throw err;
    cb();
  });
};
