const root = require("app-root-path");

const { cut } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const bottom = require("./parts/bottom");
const lengthSide = require("./parts/length-side");
const widthSide = require("./parts/width-side");
const widthMiddle = require("./parts/width-middle");
const { T } = require("./material");

layoutRowsWithOffset(
  [
    // [finger()].map(guide),
    [lengthSide()].map(cut),
    [lengthSide()].map(cut),
    [bottom()].map(cut),
    [widthSide(), widthSide(), widthMiddle()].map(cut)
  ],
  T
);
