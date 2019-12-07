const T = require("../material");
const { pinGeometry } = require("./pin");

// const width = Math.max(Math.max(T * 2, pinGeometry.d + T), pinGeometry.head.d);
const width = pinGeometry.head.r + pinGeometry.r;

module.exports = {
  width
};
