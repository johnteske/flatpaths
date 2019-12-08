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
const usbPortCutout = require("../constructs/usb-port-cutout");
const { construct: cutout } = require("../constructs/palm-cutout");

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
  subtract(usbPortCutout.construct())
)(cardOuter());

module.exports = () => {
  return part.clone();
};
