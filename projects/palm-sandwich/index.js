const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins, supports } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const { construct: palmCutout } = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");
const usbPortCutout = require("./constructs/usb-port-cutout");
const keyringTab = require("./constructs/keyring-tab");

const buttonPart = require("./parts/button");
const cardCoverPart = require("./parts/card-cover");
const cardLayerPart = require("./parts/card-layer");
const palmLayerWithButtonPart = require("./parts/palm-layer-with-button");
const palmLayerPart = require("./parts/palm-layer");
const support = require("./parts/support");
const palmCover = require("./parts/palm-cover");

const T = require("./material");

const guides = [
  group(
    cardOuter(),
    cardCutout(),
    palmCutout(),
    ...pins(true),
    ...supports(),
    buttonTranslated(),
    ...usbPortCutout.components()
  ),
  cardLayerPart.part(),
  keyringTab.construct(),
  palmLayerWithButtonPart.part(),
  palmLayerPart.part()
];

const acrylicCuts = [cardCoverPart()];

const cuts = [
  ...cardLayerPart.components(),
  ...support(),
  ...palmLayerWithButtonPart.components(),
  ...palmLayerWithButtonPart.components(),
  buttonPart(),
  ...palmLayerPart.components(),
  palmCover()
];

layoutRowsWithOffset(
  [acrylicCuts.map(cut), cuts.map(cut), guides.map(guide)],
  T
);

paper.view.viewSize = [2000, 2000];
