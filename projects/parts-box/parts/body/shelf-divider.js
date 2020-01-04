const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);
const { rotate, flipH, translateX } = require(`${root}/transform`);

const drawer = require("../../constructs/drawer");
const sideBackJoint = require("../../constructs/side-back-joint");
const shelfSideJoint = require("../../constructs/shelf-side-joint");

const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { fingerJoint } = require(`${root}/constructs/finger-joint2`);

//

const width = drawer.height;
const r = dimensions.softCornerRadius;

const panel = () =>
  path.rect({
    width,
    height: dimensions.depth,
    radius: r
  });

const joint = (part, radius = r) =>
  fingerJoint({
    width: dimensions.depth,
    height: T,
    n: dimensions.FINGERS * 2,
    radius
  })[part]();

const dividerWithDouble = pipe(
  ...applyFingerJoint(sideBackJoint.jointSection("b")),
  // twice the finger count
  ...pipe(
    rotate(90, [0, 0]),
    flipH,
    applyFingerJoint
  )(joint("b")),
  ...pipe(
    rotate(90, [0, 0]),
    translateX(width + T),
    applyFingerJoint
  )(joint("a"))
)(panel());

const dividerWithSingle = pipe(
  ...applyFingerJoint(sideBackJoint.jointSection("b")),
  // twice the finger count
  ...pipe(
    rotate(90, [0, 0]),
    flipH,
    applyFingerJoint
  )(shelfSideJoint.joint("b")),
  ...pipe(
    rotate(90, [0, 0]),
    translateX(width + T),
    applyFingerJoint
  )(shelfSideJoint.joint("b"))
)(panel());

const shelfDivider = () =>
  dividerWithSingle.intersect(dividerWithDouble).translate([T, 0]);

module.exports = shelfDivider;
