const root = require("app-root-path");

const { mm } = require(`${root}/units`);

const mac = require("../objects/mac");

const tray = {
  ...mac,
  width: mm(275),
  depth: mac.depth + mm(1.3)
};

const back = {
  width: mm(12.95) + mm(3), // TODO multiport + T
  height: mm(39.25), // TODO multiport + T
  x: tray.width
};

const bottom = {
  width: tray.width + back.width,
  height: mm(24.75), // TODO multiport + T
  y: back.height
};

const cableCenter = [mm(7.45), back.height - mm(7.25)];

module.exports = {
  back,
  bottom,
  cableCenter,
  tray
};
