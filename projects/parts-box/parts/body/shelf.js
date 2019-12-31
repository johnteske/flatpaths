const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);

const path = require(`${root}/path`);
const { subtract } = require(`${root}/boolean`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../../dimensions");
const { T } = require("../../material");

const shelfBackJoint = require("../../constructs/shelf-back-joint");

//

const { width } = dimensions;

const panel = () =>
  path.rect({
    width,
    height: dimensions.depth
  });

const shelf = () =>
  pipe(
    subtract(path.rect({ width, height: T })),
    ...shelfBackJoint.joint("b").flatMap(applyFingerJoint)
  )(panel());

module.exports = shelf;
