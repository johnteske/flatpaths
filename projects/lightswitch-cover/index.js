const root = require("app-root-path");
const { inches } = require(`${root}/units`);

module.exports = function generate(d3, svg) {
  svg
    .append("rect")
    .attr("width", inches(4))
    .attr("height", 199)
    .attr("fill", "none")
    .attr("stroke", "#000000");
};
