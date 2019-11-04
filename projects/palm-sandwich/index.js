const root = require("app-root-path");

//const paper = require("paper-jsdom");

const path = require(`${root}/path`);
//const withRoundedCorner = require("../../rounded-corner");
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

//const palm = require(`${root}/objects/palm`);
const cards = require(`${root}/objects/cards`);

const cardCutout = require("./cardCutout");

const T = inches(1 / 8); // thickness of main body material

guide(cardCutout());

// TODO split in halves to save material
const cardOuter = path
  .rect({
    width: T + cards.w + T,
    height: T + cards.h + T,
    radius: mm(3)
  })
  .subtract(cardCutout().translate([T, T]));

const cuts = [cardOuter];
cuts.forEach((g, i) => cut(g).translate([i * cards.w, cards.h + T]))

//const group = (...args) => new paper.Group(...args);
