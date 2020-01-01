const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
const { flipH, rotate, translateX } = require(`${root}/transform`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { joint } = require("./constructs/joint");

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

//

const { width, height } = drawer;

const panel = () =>
  path.rect({
    width,
    height,
    radius: dimensions.softCornerRadius
  });

const side = () =>
  pipe(
    // bottom edge
    ...applyFingerJoint(joint(width, "b", 0)),
    // left
    ...pipe(
      rotate(90, [0, 0]),
      translateX(T),
      flipH,
      applyFingerJoint
    )(joint(height, "b", 0)),
    // right
    ...pipe(
      rotate(90, [0, 0]),
      translateX(width),
      applyFingerJoint
    )(joint(height, "b", 0))
  )(panel());

module.exports = side;
