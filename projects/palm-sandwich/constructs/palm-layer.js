const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins, supportHoles } = require("../constructs/card-outer");
const usbPortCutout = require("../constructs/usb-port-cutout");
const { construct: cutout } = require("../constructs/palm-cutout");

const construct = pipe(
  ...pins().map(subtract),
  ...supportHoles().map(subtract),
  subtract(cutout()),
  subtract(usbPortCutout.construct())
)(cardOuter());

module.exports = {
  construct: () => {
    return construct.clone();
  }
};
