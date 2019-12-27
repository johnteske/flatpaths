const root = require("app-root-path");

const { inches } = require(`${root}/units`);

// IKEA Kallax interior shelf dimensions = 13.25" square, 15" deep
const size = inches(13);

module.exports = {
  width: size,
  height: size,
  depth: size
};
