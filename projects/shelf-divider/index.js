// TODO also add all possible combos for joins (from full width/depth, by notch, down to 1)
const root = require("app-root-path");
const { dpi, inches } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);
const { cut } = require(`${root}/d3/stroke`);

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);

  const WIDTH = inches(12 + 1 / 2);
  const DEPTH = inches(15 + 3 / 8);
  const HEIGHT = inches(2);

  const SLOT_SPACING = inches(2.5);

  const lineGenerator = d3.line();

  const notchPositions = width =>
    nItems(Math.floor((width - T * 2) / SLOT_SPACING) + 1).map(
      (_, i) => T + i * SLOT_SPACING
    );

  const notchPoints = x1 => {
    const x2 = x1 + T,
      y1 = 0,
      y2 = HEIGHT / 2;
    return [[x1, y1], [x1, y2], [x2, y2], [x2, y1]];
  };

  const partPoints = length => {
    const notches = notchPositions(length);
    return [
      [0, 0],
      ...notches.map(notchPoints).flat(),
      [length, 0],
      [length, HEIGHT],
      [0, HEIGHT],
      [0, 0] // close path
    ];
  };

  // horizontal
  const horizontal = g.append("g");

  horizontal.append("path").attr("d", lineGenerator(partPoints(WIDTH)));

  horizontal
    .append("text")
    .text(`${WIDTH / dpi} x ${HEIGHT / dpi}″; ${SLOT_SPACING / dpi}″ slots`)
    .attr("font-family", "monospace")
    .attr("font-size", T)
    .attr("fill", "magenta")
    .attr("stroke", "none")
    .attr("x", T)
    .attr("y", HEIGHT / 2)
    .attr("dy", "2em");

  horizontal.call(cut);

  // vertical
  const vertical = g.append("g");

  vertical.append("path").attr("d", lineGenerator(partPoints(DEPTH)));

  vertical.attr("transform", `translate(0,${HEIGHT + T})`).call(cut);
};
