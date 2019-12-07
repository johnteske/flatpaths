const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);
const { pipe } = require(`${root}/fn`);

const { width } = require("../constructs/frame");
const {
  cardOuter,
  cardOuterGeometry,
  pins,
  supports
} = require("../constructs/card-outer");
const { construct: cutout, geometry } = require("../constructs/palm-cutout");

const usbPortGeometry = {
  width: mm(15)
};
usbPortGeometry.x = geometry.x + geometry.width / 2 - usbPortGeometry.width / 2;

const usbPortCutout = path.rect({
  x: usbPortGeometry.x,
  y: cardOuterGeometry.height - width,
  width: usbPortGeometry.width,
  height: 100 // arbitrary
});

const part = pipe(
  ...pins().map(subtract),
  ...supports().map(subtract),
  subtract(cutout()),
  subtract(usbPortCutout)
)(cardOuter());

module.exports = () => {
  return part.clone();
};
