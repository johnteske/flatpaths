const root = require("app-root-path");

const { nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);

const { fingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../dimensions");
const { T } = require("../material");

const drawer = require("./drawer");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

//

const r = mm(0.5);

const widthJointSection = (part, radius) =>
  fingerJoint({
    width: drawer.width,
    height: T,
    n: 5,
    radius
  })[part]();

const joint = (part, radius = r) =>
  nItems(NUM_DRAWERS).flatMap((_, i) =>
    widthJointSection(part, radius).translate(T + i * (drawer.width + T), 0)
  );

const interiorJoints = () =>
  nItems(NUM_SHELVES - 1).flatMap((_, i) =>
    joint("a", 0).map(drawer.translateByHeights(i + 1))
  );

module.exports = {
  joint,
  interiorJoints
};
