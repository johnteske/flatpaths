const root = require("app-root-path");

const path = require(`${root}/path`);

const dimensions = require("../../dimensions");

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

module.exports = () => [back(), side(), shelf()];
