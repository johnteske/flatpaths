const root = require("app-root-path");

const path = require(`${root}/path`);

const dimensions = require("../../dimensions");

// dimensions are external--
// --finger joints will be inside these dimensions
const shelf = () =>
  path.rect({
    width: dimensions.width,
    height: dimensions.depth
  });

module.exports = shelf;
