const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);
const planarSpring = require(`${root}/constructs/planar-spring`);

const { cardOuter, pins, supportHoles } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const { construct: palmCutout } = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");
const usbPortCutout = require("./constructs/usb-port-cutout");
const quickRelease = require("./constructs/quick-release");
const beltQr = require("./constructs/belt-quick-release");

const buttonPart = require("./parts/button");
const cardCoverPart = require("./parts/card-cover");
const palmCutoutPart = require("./parts/palm-cutout");
const cardLayerPart = require("./parts/card-layer");
const palmLayerWithButtonPart = require("./parts/palm-layer-with-button");
const palmLayerPart = require("./parts/palm-layer");
// const support = require("./parts/support");
const palmCover = require("./parts/palm-cover");

const T = require("./material");

const guides = [
  planarSpring({ T: mm(1.5), w1: mm(6), w2: mm(6) * 2, h: mm(6) * 3 }),
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
  palmLayerWithButtonPart.partWithReceiver(),
  palmLayerWithButtonPart.part(),
  group(palmLayerPart.part(),
  palmCover()
)
];

const acrylicCuts = [cardCoverPart()];

const cardboardCuts = [palmCutoutPart.part()];

const cuts = [
  ...cardLayerPart.components(),
  // ...support(),
  ...palmLayerWithButtonPart.receiverComponents(),
  ...palmLayerWithButtonPart.components(),
  buttonPart(),
  ...palmLayerPart.components(),
  ...nItems(4).map(palmCover)
];

const qrCuts = [
  quickRelease.outer(),
  quickRelease.inner(),
  quickRelease.a(),
  quickRelease.outer()
];

const beltQrCuts = [beltQr.outer(), beltQr.middle(), beltQr.outer()];

layoutRowsWithOffset(
  [
    acrylicCuts.map(cut),
    cardboardCuts.map(cut),
    cuts.map(cut).concat(palmCover()),
    qrCuts.map(cut),
    beltQrCuts.map(cut),
    guides.map(guide)
  ],
  T
);

paper.view.viewSize = [2000, 2000];
