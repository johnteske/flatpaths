const root = require("app-root-path");

const { subtract, unite } = require(`${root}/boolean`);
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
const keyringTab = require("../constructs/keyring-tab");

const part = pipe(
  unite(
    keyringTab
      .construct()
      .translate([
        cardOuterGeometry.width - keyringTab.geometry.width,
        cardOuterGeometry.height - keyringTab.geometry.height / 2
      ])
  ),
  ...pins().map(subtract),
  ...supports().map(subtract),
  subtract(cutout()),
  subtract(buttonTranslated()),
  subtract(usbPortCutout.construct())
)(cardOuter());

module.exports = () => {
  return part.clone();
};
