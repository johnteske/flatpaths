const root = require("app-root-path");

const paper = require("paper-jsdom");

const { cut, guide } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);

const group = (...args) => new paper.Group(...args);

// const { T } = require("./material");

const { magSafeCutout } = require("./objects/mag-safe");
const { multiportCutout } = require("./objects/multiport");
const { back, bottom, side: sideOld } = require("./parts/tray");

const { support } = require("./parts/support");
const { side } = require("./parts/side");

const guides = [
  group(magSafeCutout(), back(), bottom()),
  group(multiportCutout(), back(), bottom()),
  group(back(), side())
  //group(back(), bottom()), // TODO needs cutouts for cables to pass through
];
guides.forEach((g, i) => guide(g).translate([0, i * mm(90)]));

const cuts = [
  back()
    .unite(bottom())
    .subtract(magSafeCutout()),
  back()
    .unite(bottom())
    .subtract(multiportCutout()),
  back().unite(sideOld()),
  support(),
  side()
];
cuts.forEach((g, i) => cut(g).translate([mm(90), i * mm(90)]));

paper.view.viewSize = [2000, 2000];
