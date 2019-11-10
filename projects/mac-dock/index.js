const root = require("app-root-path");

const paper = require("paper-jsdom");

const { cut, guide } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);

const group = (...args) => new paper.Group(...args);

const { back, bottom, side } = require("./mac-tray");
const { magSafeCutout } = require("./mag-safe");
const { multiportCutout } = require("./av-multiport");
const { support } = require("./support");
const { T } = require("./material");

const guides = [
  group(magSafeCutout(), back(), bottom()),
  group(multiportCutout(), back(), bottom()),
  group(back(), side())
  //group(back(), bottom()), // TODO needs cutouts for cables to pass through
];
//guides.forEach((g, i) => guide(g).translate([0, i * mm(90)]));

const cuts = [
  back()
    .unite(bottom())
    .subtract(magSafeCutout()),
  back()
    .unite(bottom())
    .subtract(multiportCutout()),
  back().unite(side()),
  support().translate([T * -2, 0])
];
cuts.forEach((g, i) => cut(g).translate([mm(90), i * mm(90)]));

paper.view.viewSize = [2000, 2000];
