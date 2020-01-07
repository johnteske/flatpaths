const T = require("../material");
const { pinGeometry } = require("./pin");

const a = {
  label: "T * 2",
  value: T * 2
};

const b = {
  label: "pin head radius + pin radius",
  value: pinGeometry.head.r + pinGeometry.r
};

const width = Math.max(a.value, b.value);

console.log(
  `Frame width ~${width.toFixed(2)} (based on ${
    width === a.value ? a.label : b.label
  })`
);

module.exports = {
  width
};
