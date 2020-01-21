const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins, supportHoles } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const { construct: palmCutout } = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");
const usbPortCutout = require("./constructs/usb-port-cutout");
const snapReceiver = require("./constructs/snap-receiver");
const quickRelease = require("./constructs/quick-release");

const buttonPart = require("./parts/button");
const cardCoverPart = require("./parts/card-cover");
const palmCutoutPart = require("./parts/palm-cutout");
const cardLayerPart = require("./parts/card-layer");
const palmLayerWithButtonPart = require("./parts/palm-layer-with-button");
const palmLayerPart = require("./parts/palm-layer");
// const support = require("./parts/support");
const palmCover = require("./parts/palm-cover");
const snap = require("./parts/snap");

const T = require("./material");

const guides = [
  group(
    cardOuter(),
    cardCutout(),
    palmCutout(),
    ...pins(true),
    ...supportHoles(),
    buttonTranslated(),
    ...usbPortCutout.components()
  ),
  cardLayerPart.joint(),
  cardLayerPart.part(),
  snap.part(),
  snapReceiver.cover(),
  snapReceiver.receiver(),
  palmLayerWithButtonPart.partWithReceiver(),
  palmLayerWithButtonPart.part(),
  palmLayerPart.part()
];

const acrylicCuts = [cardCoverPart()];

const cardboardCuts = [palmCutoutPart.part()];

// TODO extra 1 unit is to help join snap
// ideally the snap would have some of its own base
// to join to
const testStock = width => path.rect({ width, height: 101 });

const snapPart = snap
  .part()
  .scale(1, -1)
  .translate(0, 100);

const snapPartWidth = snapPart.internalBounds.width;
const snapPartHeight = snapPart.internalBounds.height;

const acetalCuts = [
  testStock(T + snapPartWidth + T)
    .unite(snapPart.translate(T, 0))
    .unite(
      path.rect({
        width: T,
        height: snapPartHeight,
        y: 100
      })
    )
    .unite(
      path.rect({
        width: T,
        height: snapPartHeight,
        y: 100,
        x: T + snapPartWidth
      })
    )
    .subtract(
      path.rect({
        width: snapPartWidth - T - T,
        height: T,
        r: 1,
        x: T + T,
        y: T
      })
    )
];

const cuts = [
  ...cardLayerPart.components(),
  // ...support(),
  ...palmLayerWithButtonPart.receiverComponents(),
  ...palmLayerWithButtonPart.components(),
  buttonPart(),
  ...palmLayerPart.components(),
  palmCover()
];

const qrCuts = [
  quickRelease.outer(),
  quickRelease.inner(),
  quickRelease.a(),
  quickRelease.outer()
];

layoutRowsWithOffset(
  [
    acrylicCuts.map(cut),
    cardboardCuts.map(cut),
    acetalCuts.map(cut),
    cuts.map(cut),
    qrCuts.map(cut),
    guides.map(guide)
  ],
  T
);

paper.view.viewSize = [2000, 2000];
