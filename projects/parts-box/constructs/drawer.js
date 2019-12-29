const dimensions = require("../dimensions");
const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const { T } = require("../material");

const width = (dimensions.width - T * (NUM_DRAWERS + 1)) / NUM_DRAWERS;
const height = (dimensions.height - T * (NUM_SHELVES + 1)) / NUM_SHELVES;

module.exports = {
  width,
  height
};
