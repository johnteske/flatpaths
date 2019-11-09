const root = require("app-root-path");

const paper = require("paper-jsdom");

const path = require(`${root}/path`);
//const withRoundedCorner = require("../../rounded-corner");
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

const group = (...args) => new paper.Group(...args);
//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const T = inches(1 / 8); // thickness of main body material

const { magSafe, magSafeSupport, magSafeCutout } = require("./mag-safe");

const back = path.rect({
  x: magSafe.width,
  height: mm(50), // TODO
  width: T
});
const bottom = path.rect({
  //y: magSafeSupport.height,
  width: mm(50),
  height: T
});

const guides = [
  group(magSafeCutout(), magSafeSupport(), back.clone(), bottom.clone())
];
guides.forEach((g, i) => guide(g).translate([i * 200, 0]));

//const cuts = [group(cardOuterPath(), pins()), palmFrame()];
//cuts.forEach((g, i) => cut(g).translate([i * (cardOuter.width + T), 0]));
//
