// outer dimensions for parts box
const root = require("app-root-path");

const { inches, mm } = require(`${root}/units`);

// IKEA Kallax interior shelf dimensions = 13.25" square, 15" deep
// const kallax = inches(13);

// hall shelf
//const width = inches(8);
//const height = inches(10);
//const depth = inches(9);

const width = inches(5);
const height = inches(4);
const depth = inches(3);

const NUM_SHELVES = 2;
const NUM_DRAWERS = 2; // per shelf

module.exports = {
  width,
  height,
  depth,
  NUM_SHELVES,
  NUM_DRAWERS,
  softCornerRadius: mm(0.5)
};
