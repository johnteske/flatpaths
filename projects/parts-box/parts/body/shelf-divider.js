const root = require("app-root-path");

const path = require(`${root}/path`);

const dimensions = require("../../dimensions");

const { T } = require("../../material");

const NUM_SHELVES = 4;
const shelfDivider = () =>
  path.rect({
    width: (dimensions.height - (T * NUM_SHELVES + 1)) / NUM_SHELVES, // internal
    height: dimensions.depth // external
  });

module.exports = shelfDivider;
