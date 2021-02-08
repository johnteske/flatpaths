const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { stroke, guide } = require(`${root}/d3/stroke`);

const T = inches(3 / 4);
const T2 = inches(1 / 4);

const WIDTH = inches(48);
const DEPTH = inches(18);
const HEIGHT = inches(18);

const SIDE_HEIGHT = HEIGHT - 2 * T;
const SHELF_WIDTH = (WIDTH - 3 * T) / 2;
const INNER_DEPTH = DEPTH - 99; // TODO how much space is needed?

//const label = selection =>
//  selection.attr("fill", "magenta").attr("stroke", "none");
//
//const centerLabel = (x, y) => selection =>
//  selection
//    .attr("text-anchor", "middle")
//    .attr("x", x / 2)
//    .attr("y", y / 2);

const objectReference = stroke("magenta");

const PS4 = {};
const PS5 = {};
const SWITCH = {};
const LAPTOP = {
  width: inches(13.2),
  depth: inches(9.4),
  height: inches(1.3)
};
const SCREEN = {};

module.exports = function generate(d3, g) {
  const panels = g.append("g").call(guide);

  // top/bottom
  panels
    .append("rect")
    .attr("width", WIDTH)
    .attr("height", DEPTH);

  // sides
  panels
    .append("rect")
    .attr("width", DEPTH)
    .attr("height", SIDE_HEIGHT);

  // mid support
  panels
    .append("rect")
    .attr("width", INNER_DEPTH)
    .attr("height", SIDE_HEIGHT);

  // shelf
  panels
    .append("rect")
    .attr("width", SHELF_WIDTH)
    .attr("height", INNER_DEPTH);

  // layout
  const layout = g
    .append("g")
    .attr("transform", `translate(0,${DEPTH + T})`)
    .call(guide);
  // outer
  layout
    .append("rect")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

  const shelfSpace = layout
    .append("rect")
    .attr("width", SHELF_WIDTH)
    .attr("height", SIDE_HEIGHT)
    .attr("x", T)
    .attr("y", T);

  shelfSpace.clone().attr("x", SHELF_WIDTH + 2 * T);

  // laptop goes in side-first
  layout
    .append("rect")
    .attr("width", LAPTOP.depth)
    .attr("height", LAPTOP.height)
    .call(objectReference)
    .attr("transform", `translate(${T}, ${T + SIDE_HEIGHT - LAPTOP.height})`);
};
