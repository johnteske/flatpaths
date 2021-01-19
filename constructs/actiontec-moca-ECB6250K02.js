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
  // TODO do not handle offsets internally,
  // expose dimensions and use to make offset in each call
  function hole(selection, x, y, rotation = 0) {
    return selection
      .append("rect")
      .attr("width", 2 * T)
      .attr("height", T)
      .attr("transform", `translate(${x - T},${y}) rotate(${rotation})`)
      .call(cut);
  }

  hole(g, geometry.length / 2, -T);
  hole(g, geometry.length / 2, geometry.width);
  hole(g, T, geometry.width / 2 - T, 90);

  // top support
  g.append("rect")
    .attr("width", 2 * T + geometry.length / 2 + 2 * T)
    .attr("height", 2 * T + geometry.width + 2 * T)
    .attr("transform", `translate(${-2 * T},${-2 * T})`)
    .call(cut);

  return g;
}

module.exports = {
  mount
};
