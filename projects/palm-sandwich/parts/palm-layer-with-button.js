const root = require("app-root-path");

const path = require(`${root}/path`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const palm = require(`${root}/objects/palm`);

const {
  cardOuterGeometry,
  pins,
  supportHoles
} = require("../constructs/card-outer");
const frame = require("../constructs/frame");
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

  // need to subtract again to get hole covered by keyring tab
  ...pins().map(subtract),
  ...supportHoles().map(subtract),

  subtract(buttonTranslated())
)(palmLayer.construct());

const mask = () =>
  path.rect({
    x: cardOuterGeometry.width / 2,
    y: frame.width + palm.button.y,
    width: cardOuterGeometry.width / 2,
    height: 9999 // arbitrary
  });

const a = part.clone().subtract(mask());
const b = part.clone().intersect(mask());
b.bounds.topLeft = [0, 0];

module.exports = {
  part: () => part.clone(),
  components: () => {
    return [a.clone(), b.clone()];
  }
};
