const root = require("app-root-path");

const path = require(`${root}/path`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");

const { T } = require("../../material");

//

const { width } = drawer;
const height = dimensions.depth - T;

const panel = () =>
  path.rect({
    width,
    height,
    radius: dimensions.softCornerRadius
  });

module.exports = panel;
