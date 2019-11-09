const root = require("app-root-path");

const paper = require("paper-jsdom");

const path = require(`${root}/path`);
//const withRoundedCorner = require("../../rounded-corner");
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

const group = (...args) => new paper.Group(...args);
//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const palm = require(`${root}/objects/palm`);
const cards = require(`${root}/objects/cards`);

const cardCutout = require("./cardCutout");
const pin = require("./pin");

const T = inches(1 / 8); // thickness of main body material
const outerWidth = T * 2;

const cardOuter = new paper.Rectangle({
  width: outerWidth + cards.w + outerWidth,
  height: outerWidth + palm.h + outerWidth
});

const outerFrame = () => path
  .rect({
    ...cardOuter,
    radius: T
  })

 // TODO split in halves to save material
const cardOuterPath = () => outerFrame()
  .subtract(cardCutout().translate([outerWidth, outerWidth]));

const pins = () => group(
  [
    [outerWidth / 2, outerWidth / 2],
    [cardOuter.width - outerWidth / 2, outerWidth / 2],
    [outerWidth / 2, cardOuter.height - outerWidth / 2],
    [cardOuter.width - outerWidth / 2, cardOuter.height - outerWidth / 2]
  ].map(point => pin().translate(point))
);

const palmButton1 = path.rect({
  x: cardOuter.width - outerWidth,
  y: outerWidth + palm.button.y, // from palm.y
  width: outerWidth / 2,
  height: palm.button.h
}) 
const palmButton2 = path.rect({
  x: cardOuter.width - outerWidth + (outerWidth / 2),
  y: outerWidth + palm.button.y + (palmButton1.height / 2), // from palm.y
  width: outerWidth / 2,
  height: palm.button.h / 2
}) 
const palmButton = palmButton1.unite(palmButton2);

const palmFrame = () => outerFrame().subtract(path.rect({
  width: palm.w,
  height: palm.h,
  x: (cardOuter.width - palm.w) / 2,
  y: outerWidth,
  radius: mm(9)
})).subtract(palmButton)

const guides = [cardCutout().translate([outerWidth, outerWidth]), group(cardOuterPath(), palmButton.clone())];
guides.forEach((g, i) => guide(g).translate([i * (cardOuter.width + T), cardOuter.height + T]));

const cuts = [group(cardOuterPath(), pins()), palmFrame()];
cuts.forEach((g, i) => cut(g).translate([i * (cardOuter.width + T), 0]));

//const group = (...args) => new paper.Group(...args);
