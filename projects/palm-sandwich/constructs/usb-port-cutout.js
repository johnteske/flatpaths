const root = require("app-root-path");

const withRoundedCorner = require(`${root}/rounded-corner`);
const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const frame = require("../constructs/frame");
const { cardOuterGeometry } = require("../constructs/card-outer");
const palmCutout = require("../constructs/palm-cutout");

const geometry = {
  width: mm(15),
  y: cardOuterGeometry.height - frame.width
};
geometry.x =
  palmCutout.geometry.x + palmCutout.geometry.width / 2 - geometry.width / 2;

const construct = path
  .rect({
    x: geometry.x,
    y: geometry.y,
    width: geometry.width,
    height: 100 // arbitrary
  })
  .unite(
    path.rect({
      x: geometry.x - frame.width / 2,
      y: geometry.y + frame.width / 2,
      width: frame.width,
      height: frame.width
    })
  )
  .subtract(
    path.circle({
      x: geometry.x - frame.width / 2,
      y: geometry.y + frame.width / 2,
      radius: frame.width / 2
    })
  );

module.exports = {
  geometry,
  construct: () => construct.clone()
};
