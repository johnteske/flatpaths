const root = require("app-root-path");
const { mm } = require(`${root}/units`);

const { tray } = require("../tray");

const { backGeometry } = require("./back");

const bottomGeometry = {
  width: tray.width + backGeometry.width,
  height: mm(24.75), // TODO multiport + T
  y: backGeometry.height
};

const sideGeometry = {
  width: bottomGeometry.width,
  height: bottomGeometry.height + tray.height,
  y: backGeometry.height - tray.height
};

module.exports = {
  bottomGeometry,
  sideGeometry
};
