const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);
const { flipV, translateY } = require(`${root}/transform`);

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
  pipe(...applyFingerJoint(translateY(height - T)(flipV(joint(width, "a")))))(
    panel()
  );

module.exports = bottom;
