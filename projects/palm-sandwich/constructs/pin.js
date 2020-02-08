const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

// Grainger 5MA89 binding post
const d = inches(13 / 64); // barrell diameter
const headDiameter = inches(13 / 32);

const pinGeometry = {
  d,
  r: d / 2,
  head: {
    d: headDiameter,
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
