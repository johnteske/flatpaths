const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);

const path = require(`${root}/path`);
const { subtract } = require(`${root}/boolean`);
const { rotate, flipH, translateX } = require(`${root}/transform`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../../dimensions");
const { T } = require("../../material");

const drawer = require("../../constructs/drawer");
const shelfBackJoint = require("../../constructs/shelf-back-joint");
const shelfSideJoint = require("../../constructs/shelf-side-joint");

//

const { width } = dimensions;

const panel = () =>
  path.rect({
    width,
    height: dimensions.depth,
    radius: dimensions.softCornerRadius
  });

const shelf = () =>
  pipe(
    // left joint
    ...pipe(
      rotate(90, [0, 0]),
      translateX(T),
      flipH,
      applyFingerJoint
    )(shelfSideJoint.joint("b")),
    // interior joints, for shelf dividers // TODO for each row
    ...pipe(
      rotate(90, [0, 0]),
      drawer.translateByWidths(1),
      translateX(T),
      applyFingerJoint
    )(shelfSideJoint.joint("a", 0)),
    // right joint
    ...pipe(
      rotate(90, [0, 0]),
      translateX(width),
      applyFingerJoint
    )(shelfSideJoint.joint("b")),
    // back joint
    subtract(path.rect({ width, height: T })),
    ...shelfBackJoint.joint("b").flatMap(applyFingerJoint)
  )(panel());

module.exports = shelf;
