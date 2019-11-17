const { T } = require("../../material");

const { tray } = require("../tray");

const { bottomGeometry } = require("./bottom");

const supportGeometry = {
  width: T * 2 + tray.depth + T * 2,
  height: bottomGeometry.height
};

module.exports = {
  supportGeometry
};
