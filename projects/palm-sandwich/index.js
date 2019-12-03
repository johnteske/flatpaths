const root = require("app-root-path");

const { cut, guide } = require(`${root}/stroke`);

//const { cardOuter } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");

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

const guides = [
  cardCutout()
  // cardCutout().translate([outerWidth, outerWidth]),
  //group(cardOuterPath(),
  //palmButton.clone())
];

const cuts = [
  cardOuterPart(),
  cardOuterPart()
  //, palmFrameouter
];

const cutWidths = cuts.map(c => c.internalBounds.width);
const cutXPositions = cutWidths.reduce(
  ({ positions, x }, width) => {
    const _x = x + width + T;
    return {
      positions: [...positions, x],
      x: _x
    };
  },
  { positions: [], x: 0 }
).positions;
cuts.forEach((c, i) => {
  cut(c).translate([cutXPositions[i], 0]);
});

// Get all cut heights, then get max
const maxCutHeight = cuts
  .map(c => c.internalBounds.height)
  .sort()
  .pop();

guides.forEach((g, i) => guide(g).translate([i * (100 + T), maxCutHeight + T]));

//const group = (...args) => new paper.Group(...args);
