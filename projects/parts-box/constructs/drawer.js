const root = require("app-root-path");

const dimensions = require("../dimensions");
const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const { T } = require("../material");

const { translateX, translateY } = require(`${root}/transform`);

//

const width = (dimensions.width - T * (NUM_DRAWERS + 1)) / NUM_DRAWERS;
const height = (dimensions.height - T * (NUM_SHELVES + 1)) / NUM_SHELVES;

const translateByWidths = i => translateX(i * (width + T));
const translateByHeights = i => translateY(i * (height + T));

module.exports = {
  width,
  height,
  translateByWidths,
  translateByHeights
};
