const root = require("app-root-path");
const { mm } = require(`${root}/units`);

const { tray } = require("../tray");

const backGeometry = {
  width: mm(12.95) + mm(3), // TODO multiport + T
  height: mm(39.25), // TODO multiport + T
  x: tray.width
};

module.exports = {
  backGeometry
};
