const root = require("app-root-path");

const { nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);

const { fingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../dimensions");
const { T } = require("../material");

const drawer = require("./drawer");

const { NUM_SHELVES } = dimensions;

//

const r = mm(0.5); // TODO is a duplicate

const joint = (part, radius = r) =>
  fingerJoint({
    width: dimensions.depth,
    height: T,
    n: 5,
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
