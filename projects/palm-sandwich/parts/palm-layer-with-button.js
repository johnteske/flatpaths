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
//const T = require("../material");
const { buttonTranslated } = require("../constructs/button");
const palmLayer = require("../constructs/palm-layer");
//const snapReceiver = require("../constructs/snap-receiver");
const quickRelease = require("../constructs/quick-release");

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

const _part = (withHook = false) => () =>
  pipe(
    //   ...nItems(ridges)
    //     .map((_, i) =>
    //       i % 2 === 0 ? grip.clone().translate(0, i * ridgeH) : null
    //     )
    //     .filter(r => r != null)
    //     .map(unite),

    withHook
      ? unite(
          quickRelease
            .b()
            .translate(
              cardOuterGeometry.width / 2 - mm(18),
              cardOuterGeometry.height
            )
        )
      : o => o,

    // need to subtract again to get hole covered by keyring tab
    ...pins().map(subtract),
    ...supportHoles().map(subtract),

    subtract(buttonTranslated())
  )(palmLayer.construct());

const part = _part();
const partWithReceiver = _part(true);

const mask = () =>
  path.rect({
    x: cardOuterGeometry.width / 2,
    y: frame.width + palm.button.y + palm.button.h / 2,
    width: cardOuterGeometry.width / 2,
    height: 9999 // arbitrary
  });

const makeComponents = _ => {
  const a = _().subtract(mask());
  const b = _().intersect(mask());
  b.bounds.topLeft = [0, 0];

  return [a, b];
};

module.exports = {
  part,
  components: () => makeComponents(part),
  partWithReceiver,
  receiverComponents: () => makeComponents(partWithReceiver)
};
