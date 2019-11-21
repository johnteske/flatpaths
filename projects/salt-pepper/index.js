const root = require("app-root-path");

//const paper = require("paper-jsdom");

const { cut, guide } = require(`${root}/stroke`);

const { fingerGeometry, finger } = require("./constructs/finger");

const bottom = require("./parts/bottom");
const lengthSide = require("./parts/length-side");
const widthSide = require("./parts/width-side");

guide(finger());

cut(bottom).translate(fingerGeometry.height);
//cut(lengthSide)
//cut(widthSide)
