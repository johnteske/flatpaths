const root = require("app-root-path");

const { pipe, nItems } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { rotate, translateX, translateY } = require(`${root}/transform`);

const fingerJoint = require(`${root}/constructs/finger-joint`);
const fingerJoint2 = require(`${root}/constructs/finger-joint2`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const { width, height } = dimensions;

const panel = path.rect({
  width,
  height
});

const translateByDrawerWidth = i => translateX(i * (drawer.width + T));
const translateByDrawerHeight = i => translateY(i * (drawer.height + T));

const widthJointSection = fingerJoint2({
  width: drawer.width,
  height: T,
  n: 5
}).a;

const widthJointSpace = () =>
  nItems(NUM_DRAWERS)
    .map((_, i) =>
      path
        .rect({
          width: drawer.width,
          height: T
        })
        .translate(T + i * (drawer.width + T), 0)
    )
    .flat();

const widthJointSpaces = () =>
  nItems(NUM_SHELVES + 1)
    .map((_, i) => widthJointSpace().map(translateByDrawerHeight(i)))
    .flat();

const widthJoint = () =>
  nItems(NUM_DRAWERS)
    .map((_, i) =>
      widthJointSection().map(translateX(T + i * (drawer.width + T)))
    )
    .flat();

const widthJoints = () =>
  nItems(NUM_SHELVES + 1)
    .map((_, i) => widthJoint().map(translateByDrawerHeight(i)))
    .flat();

// spans full height, all shelves
const heightJointSpace = () =>
  nItems(NUM_SHELVES)
    .map((_, i) =>
      path
        .rect({
          width: T,
          height: drawer.height
        })
        .translate([0, T + i * (drawer.height + T)])
    )
    .flat();

const heightJointSpaces = () =>
  nItems(NUM_DRAWERS + 1)
    .map((_, i) => heightJointSpace().map(translateByDrawerWidth(i)))
    .flat();

const heightJointSection = fingerJoint({
  width: drawer.height,
  height: T,
  n: 5
});

const heightJoint = () =>
  nItems(NUM_SHELVES)
    .map((_, i) =>
      heightJointSection()
        .map(translateX(i * (drawer.height + T)))
        .map(translateX(T))
    )
    .flat()
    .map(rotate(90, [0, 0]));

const heightJoints = () =>
  nItems(NUM_DRAWERS + 1)
    .map((_, i) =>
      heightJoint()
        .map(translateByDrawerWidth(i))
        .map(translateX(T))
    )
    .flat();

const back = () =>
  pipe(
    // cutout areas for width joints
    ...widthJointSpaces().map(subtract),
    // width joints
    ...widthJoints().map(unite),
    // cutout areas for height joints
    ...heightJointSpaces().map(subtract),
    // height joints
    ...heightJoints().map(unite)
  )(panel);

module.exports = back;
