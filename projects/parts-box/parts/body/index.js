const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);

const dimensions = require("../../dimensions");

// TODO break out into own part
const bottom = () =>
  path.rect({
    width: dimensions.width,
    height: dimensions.depth
  });

module.exports = () => group(bottom());
