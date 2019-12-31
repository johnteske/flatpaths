const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);
const { flipH } = require(`${root}/transform`);
const { translateX } = require(`${root}/transform`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const sideBackJoint = require("../../constructs/side-back-joint");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

//

const width = dimensions.depth;
const { height } = dimensions;

const panel = () =>
  path.rect({
    width,
    height
  });

const side = () =>
  pipe(
    // left
    subtract(
      path.rect({
        width: T,
        height
      })
    ),
    ...sideBackJoint
      .joint("b")
      .map(flipH)
      .flatMap(applyFingerJoint)
  )(panel());

module.exports = side;
