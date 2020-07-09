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
  width: inches(1 + 5 / 16),
  height: inches(2 + 5 / 8)
};
const hole = {
  r: inches(3 / 16) / 2,
  x: cover.width / 2,
  y: cover.height / 2,
  dy: inches(3 + 13 / 16) / 2
};
const holes = [[hole.x, hole.y - hole.dy], [hole.x, hole.y + hole.dy]];

module.exports = function generate(d3, svg) {
  svg
    .append("rect")
    .call(attrs(cover))
    .call(cut);

  svg
    .append("rect")
    .call(attrs(toggle))
    .attr("x", cover.width / 2)
    .attr("y", cover.height / 2)
    .attr("transform", `translate(${toggle.width / -2},${toggle.height / -2})`)
    .call(cut);

  svg
    .selectAll("circle")
    .data(holes)
    .enter()
    .append("circle")
    .attr("r", hole.r)
    .attr("transform", d => `translate(${d[0]}, ${d[1]})`)
    .call(cut);
};
