const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const { backGeometry, cableCenter } = require("./mac-tray");

const magSafeGeometry = {
  width: mm(6.5),
  height: mm(10.5),
  radius: mm(3.25)
};
magSafeGeometry.x = backGeometry.x + cableCenter[0] - magSafeGeometry.width / 2;
magSafeGeometry.y = cableCenter[1] - magSafeGeometry.height / 2;

const magSafeCutout = path.rect(magSafeGeometry).unite(
  path.rect({
    x: backGeometry.x,
    y: magSafeGeometry.y + magSafeGeometry.radius / 2,
    height: magSafeGeometry.height - magSafeGeometry.radius,
    width: magSafeGeometry.x + magSafeGeometry.width / 2 - backGeometry.x
  })
);

module.exports = {
  magSafeGeometry,
  magSafeCutout: () => magSafeCutout.clone()
};
