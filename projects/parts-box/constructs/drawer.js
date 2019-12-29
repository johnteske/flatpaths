const dimensions = require("../dimensions");
const { NUM_DRAWERS } = dimensions;

const { T } = require("../material");

const width = (dimensions.width - T * (NUM_DRAWERS + 1)) / NUM_DRAWERS;

module.exports = {
  width
};
