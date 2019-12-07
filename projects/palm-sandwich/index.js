const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { translateXWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins, supports } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const { construct: palmCutout } = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");

const buttonPart = require("./parts/button");
const cardCoverPart = require("./parts/card-cover");
const cardLayerPart = require("./parts/card-layer");
const palmLayerPart = require("./parts/palm-layer");
const palmLayerPart2 = require("./parts/palm-layer2");
const support = require("./parts/support");
const palmCover = require("./parts/palm-cover");

const T = require("./material");

let renderY = 0;

// Get all item heights, then get max
const maxHeight = items =>
  items
    .map(c => c.internalBounds.height)
    .sort((a, b) => a - b)
    .pop();

const guides = [
  group(
    cardOuter(),
    cardCutout(),
    palmCutout(),
    ...pins(true),
    ...supports(),
    buttonTranslated()
  )
];

const acrylicCuts = [cardCoverPart()];

translateXWithOffset(acrylicCuts, T).forEach(c => cut(c));

const cuts = [
  cardLayerPart(),
  palmLayerPart(),
  buttonPart(),
  palmLayerPart2(),
  support(),
  palmCover()
];

renderY += maxHeight(acrylicCuts) + T;

translateXWithOffset(cuts, T)
  .map(g => g.translate([0, renderY]))
  .forEach(c => cut(c));

renderY += maxHeight(cuts) + T;

translateXWithOffset(guides, T)
  .map(g => g.translate([0, renderY]))
  .forEach(g => guide(g));

paper.view.viewSize = [2000, 2000];
