const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
const { unite } = require(`${root}/boolean`);
const { mm } = require(`${root}/units`);

const frame = require("../constructs/frame");
const { cardOuterGeometry } = require("../constructs/card-outer");
const palmCutout = require("../constructs/palm-cutout");

const geometry = {
  width: mm(12),
  y: cardOuterGeometry.height - frame.width
};
geometry.x =
  palmCutout.geometry.x + palmCutout.geometry.width / 2 - geometry.width / 2;

const _cutout = path.rect({
  x: geometry.x,
  y: geometry.y,
  width: geometry.width,
  height: frame.width
});

const _corner = path
  .rect({
    width: frame.width / 2,
    height: frame.width / 2
  })
  .subtract(
    path.circle({
      radius: frame.width / 2
    })
  );

const _left = _corner
  .clone()
  .translate([geometry.x - frame.width / 2, geometry.y + frame.width / 2]);
const _right = _corner
  .clone()
  .scale(-1, 1)
  .translate([geometry.x + geometry.width, geometry.y + frame.width / 2]);

const construct = pipe()(_cutout);
//  unite(_left),
//  unite(_right)

module.exports = {
  geometry,
  components: () => [_cutout, _left, _right].map(item => item.clone()),
  construct: () => construct.clone()
};
