const root = require("app-root-path");

//const paper = require("paper-jsdom");

//const withRoundedCorner = require("../../rounded-corner");
const { cut, guide } = require(`${root}/stroke`);

//const group = (...args) => new paper.Group(...args);
//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const { cardOuter } = require("./constructs/card-outer");
const cardCutout = require("./constructs/card-cutout");

const T = require("./material");

//const pins = () => group(
//  [
//    [outerWidth / 2, outerWidth / 2],
//    [cardOuter.width - outerWidth / 2, outerWidth / 2],
//    [outerWidth / 2, cardOuter.height - outerWidth / 2],
//    [cardOuter.width - outerWidth / 2, cardOuter.height - outerWidth / 2]
//  ].map(point => pin().translate(point))
//);

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

// internalBounds
guides.forEach((g, i) => guide(g).translate([i * (100 + T), 200 + T]));

const cuts = [
  cardOuter()
  //group(cardOuterPath(), pins())
  //, palmFrameouter
];

cuts.forEach((g, i) => cut(g).translate([i * (100 + T), 0]));

//const group = (...args) => new paper.Group(...args);
