const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const tray = {
  width: mm(100)
  //height: mm(50),
  // depth: // use for supporting struts };
};

const backGeometry = {
  width: mm(50), // TODO
  height: mm(50), // TODO
  x: tray.width
};

const bottomGeometry = {
  width: tray.width + backGeometry.width,
  height: mm(25)
};

const bottom = path.rect({ ...bottomGeometry, y: backGeometry.height });

const back = path.rect(backGeometry);

module.exports = {
  tray,
  backGeometry,
  back: () => back.clone(),
  bottomGeometry,
  bottom: () => bottom.clone()
};
