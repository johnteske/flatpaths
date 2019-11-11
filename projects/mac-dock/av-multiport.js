const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const { back: backGeometry, cableCenter } = require("./tray");

const multiportGeometry = {
  width: mm(11),
  height: mm(58)
  //radius: mm(3.25),
};
multiportGeometry.x =
  backGeometry.x + cableCenter[0] - multiportGeometry.width / 2;
multiportGeometry.y = cableCenter[1] - multiportGeometry.height / 2;

const multiportCutout = path.rect(multiportGeometry);

module.exports = {
  multiportGeometry,
  multiportCutout: () => multiportCutout.clone()
};
