const root = require("app-root-path");

const path = require(`${root}/path`);

const drawer = require("../../constructs/drawer");

//

const { width, height } = drawer;

const panel = () =>
  path.rect({
    width,
    height
  });

module.exports = panel;
