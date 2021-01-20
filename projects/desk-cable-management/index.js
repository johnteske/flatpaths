const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { cut } = require(`${root}/d3/stroke`);

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);

  g.append("rect")
    .attr("width", inches(2))
    .attr("height", inches(1))
    .attr("rx", T)
    .call(cut);

  g.append("circle")
    .attr("r", inches(3 / 8) / 2)
    .attr("cx", inches(1))
    .attr("cy", inches(1 / 2))
    .call(cut);
};
