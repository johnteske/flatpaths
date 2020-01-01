// drawers stoppers

// soften remaining corners on parts where finger joints
// have removed material

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const { cut } = require(`${root}/stroke`);
const { rotate, translateX } = require(`${root}/transform`);

const { T } = require("./material");
const drawerConstruct = require("./constructs/drawer");

const body = require("./parts/body");
const drawer = require("./parts/drawer");
const widthSide = require("./parts/drawer/width-side");

layoutRowsWithOffset(
  [
    body().map(cut),
    drawer().map(cut),
    [
      widthSide(),
      translateX(drawerConstruct.height)(rotate(90, [0, 0])(widthSide()))
    ].map(cut)
  ],
  T
);

paper.view.viewSize = [9999, 9999];
