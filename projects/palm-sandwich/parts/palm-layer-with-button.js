const root = require("app-root-path");

const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuterGeometry, pins } = require("../constructs/card-outer");
const { buttonTranslated } = require("../constructs/button");
const palmLayer = require("../constructs/palm-layer");
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
  ...pins().map(subtract), // need to subtract again to get hole covered by keyring tab
  subtract(buttonTranslated())
)(palmLayer.construct());

module.exports = () => {
  return part.clone();
};
