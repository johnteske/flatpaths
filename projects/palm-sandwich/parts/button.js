const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const palm = require(`${root}/objects/palm`);
const { translateXWithOffset } = require(`${root}/distribution`);

const T = require("../material");

const { button } = require("../constructs/button");

const pinHole = path.rect({
  width: T * 1.5, // TODO enough to have T padding on left/right
  height: T,
  x: T,
  y: palm.button.h - T / 2
});

const pin = path.rect({
  width: T * 1.5,
  height: T * 2 // number of palm layers
});

const _button = () => button().subtract(pinHole);
const components = [_button(), _button(), pin];
const part = group(translateXWithOffset(components, 0));

module.exports = () => part.clone();
