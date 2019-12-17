const root = require("app-root-path");

const { cut, guide } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const { fingerGeometry, finger } = require("./constructs/finger");

const bottom = require("./parts/bottom");
const lengthSide = require("./parts/length-side");
const widthSide = require("./parts/width-side");
const { T } = require("./material");

layoutRowsWithOffset([
  [
    finger()
  ].map(guide),
  [
    bottom.translate(T * 2)
  ].map(cut)
], T)

//cut(lengthSide)
//cut(widthSide)
