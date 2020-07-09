const root = require("app-root-path");
const { inches } = require(`${root}/units`);

const attrs = attrs => selection => {
  Object.keys(attrs).forEach(key => selection.attr(key, attrs[key]));
  return selection;
};

const cut = attrs({ fill: "none", stroke: "#000000" });

// https://www.mcmaster.com/7533K42/
const cover = {
  width: inches(2 + 15 / 16),
  height: inches(4 + 11 / 16)
};
const toggle = {
  width: inches(3 / 8),
  height: inches(15 / 16)
};

module.exports = function generate(d3, svg) {
  svg
    .append("rect")
    .call(attrs(cover))
    .call(cut);

  svg
    .append("rect")
    .call(attrs(toggle))
    .attr("x", (cover.width - toggle.width) / 2)
    .attr("y", (cover.height - toggle.height) / 2)
    .call(cut);
};
