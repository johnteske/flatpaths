const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);

const path = require(`${root}/path`);
const { subtract } = require(`${root}/boolean`);
const { rotate, translateX } = require(`${root}/transform`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../../dimensions");
const { T } = require("../../material");

const shelfBackJoint = require("../../constructs/shelf-back-joint");
const shelfSideJoint = require("../../constructs/shelf-side-joint");

//

const { width } = dimensions;

const panel = () =>
  path.rect({
    width,
    height: dimensions.depth
  });

const shelf = () =>
  pipe(
    // back joint
    subtract(path.rect({ width, height: T })),
    ...shelfBackJoint.joint("b").flatMap(applyFingerJoint),
    // left joint
    ...pipe(
      rotate(90, [0, 0]),
      translateX(T),
      applyFingerJoint
    )(shelfSideJoint.joint("b")),
    // right joint
    ...pipe(
      rotate(90, [0, 0]),
      translateX(width),
      applyFingerJoint
    )(shelfSideJoint.joint("b"))
  )(panel());

module.exports = shelf;
