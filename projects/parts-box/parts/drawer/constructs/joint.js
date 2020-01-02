const root = require("app-root-path");

const { fingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../../../dimensions");
const { T } = require("../../../material");

//

const r = dimensions.softCornerRadius;

const joint = (width, part, radius = r) =>
  fingerJoint({
    width,
    height: T,
    n: dimensions.FINGERS,
    radius
  })[part]();

module.exports = {
  joint
};
