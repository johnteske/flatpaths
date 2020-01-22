const root = require("app-root-path");
const { mm } = require(`${root}/units`);
const { pinGeometry } = require("./pin");

const a = {
  label: "6 mm",
  value: mm(6)
};

const b = {
  label: "pin head radius",
  value: pinGeometry.head.r
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
