const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { translateXWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");
const palmCutout = require("./constructs/palm-cutout");
const { buttonTranslated } = require("./constructs/button");

const buttonPart = require("./parts/button");
const cardCoverPart = require("./parts/card-cover");
const cardLayerPart = require("./parts/card-layer");
const palmLayerPart = require("./parts/palm-layer");

const T = require("./material");

const guides = [
  group(
    cardOuter(),
    cardCutout(),
    palmCutout(),
    ...pins(true),
    buttonTranslated()
  )
];

const cuts = [cardCoverPart(), cardLayerPart(), palmLayerPart(), buttonPart()];

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
