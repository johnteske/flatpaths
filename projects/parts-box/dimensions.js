const root = require("app-root-path");

const { inches } = require(`${root}/units`);

// IKEA Kallax interior shelf dimensions = 13.25" square, 15" deep
// const kallax = inches(13);

// hall shelf
const width = inches(8);
const height = inches(10);
const depth = inches(9);

module.exports = {
  width,
  height,
  depth
};
