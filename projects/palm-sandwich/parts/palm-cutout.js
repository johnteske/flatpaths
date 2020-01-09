const root = require("app-root-path");

const palm = require(`${root}/objects/palm`);
const path = require(`${root}/path`);

const cutout = require(`../constructs/palm-cutout`);
const { geometry: portGeometry } = require(`../constructs/usb-port-cutout`);

const buttonArea = path.rect({
  width: 10,
  height: palm.button.h + 20,
  y: palm.button.y - 10
});

const portArea = path.rect({
  width: portGeometry.width + 20,
  height: 10,
  x: (cutout.geometry.width - portGeometry.width - 20) / 2,
  y: cutout.geometry.height - 10
});

const _part = cutout.construct();
_part.bounds.topLeft = [0, 0];

const part = _part.subtract(buttonArea).subtract(portArea);

module.exports = {
  part: () => part.clone()
};
