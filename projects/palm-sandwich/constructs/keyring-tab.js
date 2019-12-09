const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const frame = require("./frame");
const pin = require("./pin");

const geometry = {
  width: pin.pinGeometry.head.d,
  height: pin.pinGeometry.head.d * 2
};

const construct = path
  .rect({
    ...geometry,
    radius: pin.pinGeometry.head.r
  })
  .subtract(
    path.circle({
      radius: mm(1),
      x: geometry.width / 2,
      y: geometry.height * 0.75
    })
  );

module.exports = {
  geometry,
  construct: () => construct.clone()
};
