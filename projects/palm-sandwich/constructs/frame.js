const T = require("../material");
const { pinGeometry } = require("./pin");

const width = Math.max(T * 2, pinGeometry.head.r + pinGeometry.r);

module.exports = {
  width
};
