// drawers stoppers

// soften remaining corners on parts where finger joints
// have removed material

// fix finger joint edges or mask with rectangles

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const { cut } = require(`${root}/stroke`);
const { rotate, translateX } = require(`${root}/transform`);

const { T } = require("./material");
const drawerConstruct = require("./constructs/drawer");

//const body = require("./parts/body");
const back = require("./parts/body/back");
const side = require("./parts/body/side");
const shelf = require("./parts/body/shelf");
const shelfDivider = require("./parts/body/shelf-divider");

//const drawer = require("./parts/drawer");
const bottom = require("./parts/drawer/bottom");
const depthSide = require("./parts/drawer/depth-side");
const widthSide = require("./parts/drawer/width-side");

layoutRowsWithOffset(
  [
    [back(), side(), side()].map(cut),
    [shelf(), shelfDivider()].map(cut),
    [bottom(), depthSide(), depthSide()].map(cut),
    [
      widthSide(),
      translateX(drawerConstruct.height)(rotate(90, [0, 0])(widthSide()))
    ].map(cut)
  ],
  T
);
