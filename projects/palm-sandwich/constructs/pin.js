const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const d = mm(5);
const headDiameter = mm(11);

const pinGeometry = {
  d,
  r: d / 2,
  head: {
    d: mm(11),
    r: headDiameter / 2
  }
};

const pinHole = path.circle({
  radius: pinGeometry.r
});

const pinHead = path.circle({
  radius: pinGeometry.head.r
});

const pin = (withHead = false) =>
  withHead ? group(pinHole.clone(), pinHead.clone()) : pinHole.clone();

module.exports = {
  pinGeometry,
  pin
};
