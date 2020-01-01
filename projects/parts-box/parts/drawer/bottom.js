const root = require("app-root-path");

const { unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);
const {
  flipH,
  flipV,
  rotate,
  translateX,
  translateY
} = require(`${root}/transform`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");

const { T } = require("../../material");

const { joint } = require("./constructs/joint");

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

//

const { width } = drawer;
const height = dimensions.depth - T;

const panel = () =>
  path.rect({
    width,
    height,
    radius: dimensions.softCornerRadius
  });

const bottom = () =>
  pipe(
    // left
    ...pipe(
      rotate(90, [0, 0]),
      translateX(T),
      flipH,
      applyFingerJoint
    )(joint(height, "a")),
    // right
    ...pipe(
      rotate(90, [0, 0]),
      translateX(width),
      applyFingerJoint
    )(joint(height, "a")),
    // front edge
    ...applyFingerJoint(joint(width, "a", 0)),
    // TODO handle
    unite(
      path.rect({
        width,
        height: T * 2,
        y: T * -2,
        radius: dimensions.softCornerRadius
      })
    ),
    // back edge
    ...applyFingerJoint(translateY(height - T)(flipV(joint(width, "a")))),
    translateY(T * 2)
  )(panel());

module.exports = bottom;
