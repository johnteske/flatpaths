const root = require("app-root-path");

const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { translateXWithOffset } = require(`${root}/distribution`);

const { cardOuter, pins } = require("./constructs/card-outer");
//const cardCutout = require("./constructs/card-cutout");

const cardCoverPart = require("./parts/card-cover");
const cardOuterPart = require("./parts/card-outer");

const T = require("./material");

//const palmButton1 = path.rect({
//  x: cardOuter.width - outerWidth,
//  y: outerWidth + palm.button.y, // from palm.y
//  width: outerWidth / 2,
//  height: palm.button.h
//})
//const palmButton2 = path.rect({
//  x: cardOuter.width - outerWidth + (outerWidth / 2),
//  y: outerWidth + palm.button.y + (palmButton1.height / 2), // from palm.y
//  width: outerWidth / 2,
//  height: palm.button.h / 2
//})
//const palmButton = palmButton1.unite(palmButton2);

//const palmFrame = () => outerFrame().subtract(path.rect({
//  width: palm.w,
//  height: palm.h,
//  x: (cardOuter.width - palm.w) / 2,
//  y: outerWidth,
//  radius: mm(9)
//})).subtract(palmButton)

const guides = [group(cardOuter(), ...pins(true))];

const cuts = [cardCoverPart(), cardOuterPart()];

translateXWithOffset(cuts, T).forEach(c => cut(c));

// Get all cut heights, then get max
const maxCutHeight = cuts
  .map(c => c.internalBounds.height)
  .sort()
  .pop();

translateXWithOffset(guides, T)
  .map(g => g.translate([0, maxCutHeight + T]))
  .forEach(g => guide(g));
