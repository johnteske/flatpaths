// body
// - shelves/top/bottom
// - shelf dividers
// - sides
//
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

const { guide } = require(`${root}/stroke`);

const body = require("./parts/body");

guide(body());

paper.view.viewSize = [2000, 2000];
