const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const usbPortCutout = require(`../constructs/usb-port-cutout`);
const { cardOuter, pins, supports } = require("../constructs/card-outer");
const { construct: cutout } = require("../constructs/palm-cutout");

// TODO this whole part can be composed of a palm layer construct
const part = pipe(
  ...pins().map(subtract),
  ...supports().map(subtract),
  subtract(cutout()),
  subtract(usbPortCutout.construct())
)(cardOuter());

module.exports = () => {
  return part.clone();
};
