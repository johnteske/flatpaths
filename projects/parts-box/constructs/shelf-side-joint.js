const root = require("app-root-path");

const { nItems } = require(`${root}/fn`);

const { fingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../dimensions");
const { T } = require("../material");

const drawer = require("./drawer");

const { NUM_SHELVES } = dimensions;

//

const r = dimensions.softCornerRadius;

const joint = (part, radius = r) =>
  fingerJoint({
    width: dimensions.depth,
    height: T,
    n: dimensions.FINGERS,
    radius
  })[part]();

const interiorJoints = () =>
  nItems(NUM_SHELVES - 1).flatMap((_, i) =>
    drawer.translateByHeights(i + 1)(joint("a", 0))
  );

module.exports = {
  joint,
  interiorJoints
};
