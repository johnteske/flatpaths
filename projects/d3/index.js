const root = require("app-root-path");
const { dpi, inches } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);

  const WIDTH = inches(8);
  const DEPTH = inches(12);
  const HEIGHT = inches(3.5);

  const SLOT_SPACING = inches(2.5);

  const cut = selection => {
    // TODO return/type for `call`ed functions?
    selection.attr("fill", "none").attr("stroke", "black");
  };

  //  const score = selection => {
  //    selection.attr("fill", "none").attr("stroke", "magenta");
  //  }

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

  const hNotches = notchPositions(WIDTH);
  const notchPoints = x1 => {
  const x2 = x1 + T
  const y1 = 0
  const y2 = HEIGHT / 2
      return[
    [x1, y1],
    [x1, y2],
    [x2, y2],
    [x2, y1],
  ]}

  const lineGenerator = d3.line();
  const points = [
    [0, 0],
    ...hNotches.map(notchPoints).flat(),
    [WIDTH, 0],
    [WIDTH, HEIGHT],
    [0, HEIGHT]
  ];

  horizontal.append("path").attr("d", lineGenerator(points));

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

  vertical
    .append("rect")
    .attr("width", DEPTH)
    .attr("height", HEIGHT);

  vertical.call(makeNotches(notchPositions(DEPTH)));

  vertical.attr("transform", `translate(0,${HEIGHT + T})`).call(cut);
};
