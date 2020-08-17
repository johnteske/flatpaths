const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);

module.exports = function generate(g) {
  const T = inches(1 / 8);

  const WIDTH = inches(10);
  const DEPTH = inches(8);
  const HEIGHT = inches(3);

  const SLOT_SPACING = inches(2.5);

  const cut = selection => {
    // TODO return/type for `call`ed functions?
    selection.attr("fill", "none").attr("stroke", "black");
  };

  const notchPositions = width =>
    nItems(Math.floor((width - T * 2) / SLOT_SPACING) + 1).map(
      (_, i) => T + i * SLOT_SPACING
    );

  const makeNotches = data => selection => {
    selection
      .selectAll("noop")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", T)
      .attr("height", HEIGHT / 2)
      .attr("x", d => d)
      .call(cut);
  };

  // horizontal
  const horizontal = g.append("g");

  horizontal
    .append("rect")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .call(cut);

  horizontal.call(makeNotches(notchPositions(WIDTH)));

  // vertical
  const vertical = g.append("g");

  vertical
    .append("rect")
    .attr("width", DEPTH)
    .attr("height", HEIGHT)
    .call(cut);

  vertical.call(makeNotches(notchPositions(DEPTH)));

  vertical.attr("transform", `translate(0,${HEIGHT})`);
};
