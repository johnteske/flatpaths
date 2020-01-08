const root = require("app-root-path");

const path = require(`${root}/path`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe, nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);
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

/**/
const gripY = frame.width + mm(9); // subtract corner radius
const gripH = palm.h - mm(18); // subtract corner radius
const ridges = 9;
const ridgeH = gripH / ridges;

const grip = path.rect({
  width: mm(1),
  height: ridgeH,
  x: -1 * mm(0.5),
  y: gripY,
  radius: mm(0.5)
});
/**/

const part = pipe(
  ...nItems(ridges)
    .map((_, i) => (i % 2 === 0 ? grip.clone().translate(0, i * ridgeH) : null))
    .filter(r => r != null)
    .map(unite),
  //  ...nItems(ridges)
  //    .map((_, i) =>
  //      i % 2 === 1 ?
  //      grip
  //        .clone()
  //        .scale(-1, 1)
  //        .translate(-1 * mm(0.5), i * ridgeH) : null
  //    )
  //    .filter(r => r != null)
  //    .map(subtract),
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
