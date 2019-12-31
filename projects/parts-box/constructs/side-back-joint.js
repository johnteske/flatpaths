const root = require("app-root-path");

const { nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);

const { fingerJoint } = require(`${root}/constructs/finger-joint2`);

const { rotate, translateX } = require(`${root}/transform`);

const dimensions = require("../dimensions");
const { T } = require("../material");

const drawer = require("./drawer");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

//

const r = mm(0.5); // TODO is a duplicate

const heightJointSection = (part, radius) =>
  fingerJoint({
    width: drawer.height,
    height: T,
    n: 5,
    radius
  })[part]();

const joint = (part, radius = r) =>
  nItems(NUM_SHELVES)
    .flatMap((_, i) =>
      heightJointSection(part, radius).translate(T + i * (drawer.height + T), 0)
    )
    .map(rotate(90, [0, 0]))
    .map(translateX(T));

const interiorJoints = () =>
  nItems(NUM_DRAWERS - 1).flatMap((_, i) =>
    joint("a", 0)
      .map(drawer.translateByWidths(i + 1))
      .map(translateX(T))
  );

module.exports = {
  joint,
  interiorJoints
};
