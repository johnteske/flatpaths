const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const { backGeometry, cableCenter } = require("./mac-tray");

const multiportGeometry = {
  width: mm(11),
  height: mm(58),
  //radius: mm(3.25),
  x: backGeometry.x
};
//magSafeGeometry.y = backGeometry.height - magSafeGeometry.height - mm(2);
multiportGeometry.y = cableCenter[1] - multiportGeometry.height / 2;

const multiportCutout = path.rect(multiportGeometry);

module.exports = {
  multiportGeometry,
  multiportCutout: () => multiportCutout.clone()
};
