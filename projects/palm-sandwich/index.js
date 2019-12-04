const root = require("app-root-path");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { translateXWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");

const cardCoverPart = require("./parts/card-cover");
const cardLayerPart = require("./parts/card-layer");
const palmLayerPart = require("./parts/palm-layer");

const T = require("./material");

const guides = [group(cardOuter(), cardCutout(), ...pins(true))];

const cuts = [cardCoverPart(), cardLayerPart(), palmLayerPart()];

translateXWithOffset(cuts, T).forEach(c => cut(c));

// Get all cut heights, then get max
const maxCutHeight = cuts
  .map(c => c.internalBounds.height)
  .sort()
  .pop();

translateXWithOffset(guides, T)
  .map(g => g.translate([0, maxCutHeight + T]))
  .forEach(g => guide(g));
