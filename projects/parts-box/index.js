// drawers stoppers
//
// parts drawers 1u, 2u, 3u, 4u
// - bottom with pull
// - sides
// - front
// - back
// - divider (1 or 2, optional)

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const { cut } = require(`${root}/stroke`);

const { T } = require("./material");

const body = require("./parts/body");
const drawer = require("./parts/drawer");

layoutRowsWithOffset([body().map(cut), drawer().map(cut)], T);

paper.view.viewSize = [9999, 9999];
