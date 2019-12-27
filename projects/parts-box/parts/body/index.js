const root = require("app-root-path");

const path = require(`${root}/path`);

const dimensions = require("../../dimensions");
const { T } = require("../../material");

// TODO break out into own part
// dimensions are external--
// --finger joints will be inside these dimensions
const back = () =>
  path.rect({
    width: dimensions.width,
    height: dimensions.height
  });

// TODO break out into own part
// dimensions are external--
// --finger joints will be inside these dimensions
const side = () =>
  path.rect({
    width: dimensions.depth,
    height: dimensions.height
  });

// TODO break out into own part
// dimensions are external--
// --finger joints will be inside these dimensions
const shelf = () =>
  path.rect({
    width: dimensions.width,
    height: dimensions.depth
  });

// TODO break out into own part
const NUM_SHELVES = 4;
const shelfDivider = () =>
  path.rect({
    width: (dimensions.height - (T * NUM_SHELVES + 1)) / NUM_SHELVES, // internal
    height: dimensions.depth // external
  });

module.exports = () => [back(), side(), shelf(), shelfDivider()];
