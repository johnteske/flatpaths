const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { nItems } = require(`${root}/fn`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins, supportHoles } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const { construct: palmCutout } = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");
const usbPortCutout = require("./constructs/usb-port-cutout");
const { withMarks } = require("./constructs/layer-mark");
//const quickRelease = require("./constructs/quick-release");
//const beltQr = require("./constructs/belt-quick-release");

const buttonPart = require("./parts/button");
const cardCoverPart = require("./parts/card-cover");
const palmCutoutPart = require("./parts/palm-cutout");
const cardLayerPart = require("./parts/card-layer");
const palmLayerWithButtonPart = require("./parts/palm-layer-with-button");
const palmLayerPart = require("./parts/palm-layer");
const palmCover = require("./parts/palm-cover");

const T = require("./material");

const guides = [
  group(
    cardOuter(),
    cardCutout(),
    palmCutout(),
    ...pins(true),
    ...supportHoles(),
    buttonTranslated(),
    ...usbPortCutout.components(),
    palmCover()
  ),
  cardLayerPart.part(),
  palmLayerWithButtonPart.partWithReceiver(),
  palmLayerWithButtonPart.part(),
  group(palmLayerPart.part(), palmCover())
];

const markFirst = n => (v, i) => {
  return i === 0 ? withMarks(v, n) : v;
};

// 1/16"
const acrylicCuts = [
  withMarks(cut(cardCoverPart()), 1),
  ...cardLayerPart
    .components()
    .map(cut)
    .map(markFirst(2))
];

const cardboardCuts = [palmCutoutPart.part()];

const delrinCuts = [
  ...palmLayerWithButtonPart
    .receiverComponents()
    .map(cut)
    .map(markFirst(4))
];

const woodCuts = [
  ...palmLayerWithButtonPart
    .components()
    .map(cut)
    .map(markFirst(3)),
  cut(buttonPart()),
  ...palmLayerPart
    .components()
    .map(cut)
    .map(markFirst(5)),
  ...nItems(4)
    .map(palmCover)
    .map(cut)
];

//const qrCuts = [
//  quickRelease.outer(),
//  quickRelease.inner(),
//  quickRelease.a(),
//  quickRelease.outer()
//];

//const beltQrCuts = [beltQr.outer(), beltQr.middle(), beltQr.outer()];

layoutRowsWithOffset(
  [
    acrylicCuts,
    cardboardCuts.map(cut),
    delrinCuts,
    woodCuts,
    //qrCuts.map(cut),
    //beltQrCuts.map(cut),
    guides.map(guide)
  ],
  T
);

paper.view.viewSize = [2000, 3000];
