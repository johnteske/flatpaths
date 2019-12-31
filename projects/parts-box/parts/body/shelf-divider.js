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
const { mm } = require(`${root}/units`);

//

const width = drawer.height;

const panel = () =>
  path.rect({
    width,
    height: dimensions.depth
  });

const r = mm(0.5); // TODO dup
const joint = (part, radius = r) =>
  fingerJoint({
    width: dimensions.depth,
    height: T,
    n: 5 * 2, // TODO twice the finger count as shelfSideJoint
    radius
  })[part]();

const dividerWithDouble = pipe(
  ...applyFingerJoint(sideBackJoint.jointSection("b")),
  // twice the finger count
  ...pipe(
    rotate(90, [0, 0]),
    translateX(T),
    flipH,
    applyFingerJoint
  )(joint("b")),
  ...pipe(
    rotate(90, [0, 0]),
    translateX(width),
    applyFingerJoint
  )(joint("a"))
)(panel());

const dividerWithSingle = pipe(
  ...applyFingerJoint(sideBackJoint.jointSection("b")),
  // twice the finger count
  ...pipe(
    rotate(90, [0, 0]),
    translateX(T),
    flipH,
    applyFingerJoint
  )(shelfSideJoint.joint("b")),
  ...pipe(
    rotate(90, [0, 0]),
    translateX(width),
    applyFingerJoint
  )(shelfSideJoint.joint("b"))
)(panel());

const shelfDivider = () => dividerWithSingle.intersect(dividerWithDouble);

module.exports = shelfDivider;
