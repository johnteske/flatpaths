const root = require("app-root-path");
const { mm } = require(`${root}/units`);

const { T } = require("../../material");

const { slotGeometry } = require("../slot");
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

const slotY = bottomGeometry.height + bottomGeometry.y - slotGeometry.height;

const slotPoints = [
  [T * 2, slotY],
  [tray.width / 3, slotY],
  [(tray.width / 3) * 2, slotY],
  [tray.width - T * 2, slotY]
];

module.exports = {
  bottomGeometry,
  sideGeometry,
  slotPoints
};
