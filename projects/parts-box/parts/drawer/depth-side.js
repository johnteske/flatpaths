const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
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

const {
  applyFingerJoint,
  pipeFingerJoint
} = require(`${root}/constructs/finger-joint2`);

//

const width = drawer.height;
const height = dimensions.depth - T;

const panel = () =>
  path.rect({
    width,
    height,
    radius: dimensions.softCornerRadius
  });

const side = () =>
  pipe(
    //...pipe(applyFingerJoint)(joint(width, "a")),
    pipeFingerJoint(joint(width, "a")),
    ...pipe(
      translateY(height - T),
      flipV,
      applyFingerJoint
    )(joint(width, "a")),

    ...pipe(
      rotate(90, [0, 0]),
      translateX(T),
      flipH,
      applyFingerJoint
    )(joint(height, "b"))
  )(panel());

module.exports = side;
