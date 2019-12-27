const root = require("app-root-path");

const path = require(`${root}/path`);

const dimensions = require("../../dimensions");

// TODO break out into own part
// dimensions are external--
// --finger joints will be inside these dimensions
const bottom = () =>
  path.rect({
    width: dimensions.width,
    height: dimensions.depth
  });

// TODO break out into own part
// dimensions are external--
// --finger joints will be inside these dimensions
const side = () =>
  path.rect({
    width: dimensions.depth,
    height: dimensions.height
  });

module.exports = () => [bottom(), side()];
