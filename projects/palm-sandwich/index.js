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

const cuts = [
  ...acrylicCuts, // TODO split out from other materials
  cardLayerPart(),
  palmLayerPart(),
  buttonPart(),
  palmLayerPart2(),
  support(),
  palmCover()
];

translateXWithOffset(cuts, T).forEach(c => cut(c));

// Get all cut heights, then get max
const maxCutHeight = cuts
  .map(c => c.internalBounds.height)
  .sort((a, b) => a - b)
  .pop();

translateXWithOffset(guides, T)
  .map(g => g.translate([0, maxCutHeight + T]))
  .forEach(g => guide(g));

paper.view.viewSize = [2000, 2000];
