// outer dimensions for parts box
const root = require("app-root-path");

const { inches, mm } = require(`${root}/units`);

// IKEA Kallax interior shelf dimensions = 13.25" square, 15" deep
// const kallax = inches(13);

// hall shelf 8w 10h 9d
const width = inches(8);
const height = inches(8);
const depth = inches(8);

const NUM_SHELVES = 3;
const NUM_DRAWERS = 3; // per shelf

const FINGERS = 7;

module.exports = {
  width,
  height,
  depth,
  NUM_SHELVES,
  NUM_DRAWERS,
  FINGERS,
  softCornerRadius: mm(0.5)
};
