const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const { backGeometry } = require("./mac-tray");

const magSafeGeometry = {
  width: mm(6.5),
  height: mm(10.5),
  radius: mm(3.25),
  x: backGeometry.x
};
magSafeGeometry.y = backGeometry.height - magSafeGeometry.height - mm(2);

const magSafeCutout = path.rect(magSafeGeometry);

module.exports = {
  magSafeGeometry,
  magSafeCutout: () => magSafeCutout.clone()
};
