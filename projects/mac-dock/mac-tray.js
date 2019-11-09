const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const tray = {
  width: mm(50),
  height: mm(15)
  // depth: // use for supporting struts };
};

const backGeometry = {
  width: mm(12.95) + mm(3), // TODO multiport + T
  height: mm(39.25), // TODO multiport + T
  x: tray.width
};

const back = path.rect(backGeometry);

const cableCenter = [mm(7.45), backGeometry.height - mm(7.25)];

const bottomGeometry = {
  width: tray.width + backGeometry.width,
  height: mm(24.75), // TODO multiport + T
  y: backGeometry.height
};

const bottom = path.rect(bottomGeometry);

const sideGeometry = {
  width: bottomGeometry.width,
  height: bottomGeometry.height + tray.height,
  y: backGeometry.height - tray.height
};

const side = path.rect(sideGeometry);

module.exports = {
  tray,
  backGeometry,
  back: () => back.clone(),
  cableCenter,
  bottomGeometry,
  bottom: () => bottom.clone(),
  sideGeometry,
  side: () => side.clone()
};
