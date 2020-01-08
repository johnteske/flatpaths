const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);
const palm = require(`${root}/objects/palm`);
const { translateXWithOffset } = require(`${root}/distribution`);

const T = require("../material");

const { button } = require("../constructs/button");

const pinHole = path.rect({
  width: T,
  height: T,
  x: T,
  y: (palm.button.h - T) / 2
});

const pin = path.rect({
  width: T + mm(0.2), // adjust for kerf
  height: T * 2, // number of palm layers
  radius: mm(0.5)
});

const _button = () => button().subtract(pinHole);
const components = [_button(), _button(), pin];
const part = group(translateXWithOffset(components, T));

module.exports = () => part.clone();
