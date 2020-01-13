const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins, supportHoles } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const { construct: palmCutout } = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");
const usbPortCutout = require("./constructs/usb-port-cutout");
const snapReceiver = require("./constructs/snap-receiver");

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
  snapReceiver.cover(),
  snapReceiver.receiver(),
  palmLayerWithButtonPart.partWithReceiver(),
  palmLayerWithButtonPart.part(),
  palmLayerPart.part()
];

const acrylicCuts = [cardCoverPart()];

const cardboardCuts = [palmCutoutPart.part()];

const cuts = [
  snap.part(),
  ...cardLayerPart.components(),
  // ...support(),
  ...palmLayerWithButtonPart.receiverComponents(),
  ...palmLayerWithButtonPart.components(),
  buttonPart(),
  ...palmLayerPart.components(),
  palmCover()
];

layoutRowsWithOffset(
  [
    acrylicCuts.map(cut),
    cardboardCuts.map(cut),
    cuts.map(cut),
    guides.map(guide)
  ],
  T
);

paper.view.viewSize = [2000, 2000];
