const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const tray = {
  width: mm(50)
  //height: mm(50),
  // depth: // use for supporting struts };
};

const backGeometry = {
  width: mm(25), // TODO
  height: mm(50), // TODO
  x: tray.width
};

const cableCenter = [0, backGeometry.height - mm(7.25)];

const bottomGeometry = {
  width: tray.width + backGeometry.width,
  height: mm(30)
};

const bottom = path.rect({ ...bottomGeometry, y: backGeometry.height });

const back = path.rect(backGeometry);

module.exports = {
  tray,
  backGeometry,
  back: () => back.clone(),
  cableCenter,
  bottomGeometry,
  bottom: () => bottom.clone()
};
