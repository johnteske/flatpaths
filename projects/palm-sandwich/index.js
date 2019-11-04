const root = require("app-root-path");

const paper = require("paper-jsdom");

const path = require(`${root}/path`);
//const withRoundedCorner = require("../../rounded-corner");
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

const group = (...args) => new paper.Group(...args);
//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

//const palm = require(`${root}/objects/palm`);
const cards = require(`${root}/objects/cards`);

const cardCutout = require("./cardCutout");
const pin = require("./pin");

const pins = group([[37, 66], [12, 25]].map(point => pin().translate(point)));

const T = inches(1 / 8); // thickness of main body material
const outerWidth = T * 2;

// TODO split in halves to save material
const cardOuter = path
  .rect({
    width: outerWidth + cards.w + outerWidth,
    height: outerWidth + cards.h + outerWidth,
    radius: outerWidth
  })
  .subtract(cardCutout().translate([outerWidth, outerWidth]));

const guides = [cardCutout().translate([outerWidth, outerWidth]), pins.clone()];
guides.forEach((g, i) => guide(g).translate([i * cards.w, cards.h + 66]));

const cuts = [group(cardOuter, pins.clone())];
cuts.forEach((g, i) => cut(g).translate([i * cards.w, 0]));

//const group = (...args) => new paper.Group(...args);
