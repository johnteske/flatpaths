const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { cut, guide } = require(`${root}/d3/stroke`);

const geometry = {
  width: inches(2.5),
  length: inches(4.75),
  height: inches(1)
};

function mount(selection, T) {
  const g = selection.append("g").attr("id", "actiontec-moca-ECB6250K02-mount");

  // moca footprint
  g.append("rect")
    .attr("width", geometry.length)
    .attr("height", geometry.width)
    .call(guide);

  // support holes, TODO to go in base
  // TODO define as points for better control over rotation
  function hole(selection, x, y, rotation = 0) {
    return selection
      .append("rect")
      .attr("width", 2 * T)
      .attr("height", T)
      .attr("transform", `translate(${x},${y}) rotate(${rotation})`)
      .call(cut);
  }

  hole(g, T, -T);
  hole(g, geometry.length - 3 * T, -T);

  hole(g, T, geometry.width);
  hole(g, geometry.length - 3 * T, geometry.width);

  hole(g, 0, T, 90);
  hole(g, 0, geometry.width - 3 * T, 90);

  // top support
  const topPoints = [
    [-2 * T, -2 * T],
    [geometry.length, -2 * T],
    [geometry.length, 2 * T],
    [2 * T, 2 * T],
    [2 * T, geometry.width - 2 * T],
    [geometry.length, geometry.width - 2 * T],
    [geometry.length, geometry.width + 2 * T],
    [-2 * T, geometry.width + 2 * T]
  ];
  g.append("path")
    .attr(
      "d",
      topPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`) + "Z"
    )
    .call(cut);

  return g;
}

module.exports = {
  mount
};
