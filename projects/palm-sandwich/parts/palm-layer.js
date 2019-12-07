const root = require("app-root-path");

const { subtract, unite } = require(`${root}/boolean`);
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
const { buttonTranslated } = require("../constructs/button");
const { construct: cutout, geometry } = require("../constructs/palm-cutout");

// TODO this should be a construct
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

// TODO this should be a construct
const keyringTab = path
  .rect({
    width,
    height: width * 2
  })
  .subtract(
    path.circle({
      radius: mm(1),
      x: width / 2,
      y: width * 1.5
    })
  )
  .translate([
    cardOuterGeometry.width - width,
    cardOuterGeometry.height - width
  ]);

const part = pipe(
  unite(keyringTab),
  ...pins().map(subtract),
  ...supports().map(subtract),
  subtract(cutout()),
  subtract(buttonTranslated()),
  subtract(usbPortCutout)
)(cardOuter());

module.exports = () => {
  return part.clone();
};
