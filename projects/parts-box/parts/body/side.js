const root = require("app-root-path");

const path = require(`${root}/path`);

const dimensions = require("../../dimensions");

// dimensions are external--
// --finger joints will be inside these dimensions
const side = () =>
  path.rect({
    width: dimensions.depth,
    height: dimensions.height
  });

module.exports = side;
