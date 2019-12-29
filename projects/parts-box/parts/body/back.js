const root = require("app-root-path");

const { pipe, nItems } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { rotate, translateX, translateY } = require(`${root}/transform`);

const fingerJoint = require(`${root}/constructs/finger-joint`);

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

const widthJointSection = fingerJoint({
  width: drawer.width,
  height: T,
  n: 5
});

const widthJointSpace = () =>
  nItems(NUM_DRAWERS).reduce(
    (acc, _, i) =>
      acc.concat(
        path
          .rect({
            width: drawer.width,
            height: T
          })
          .translate(T + i * (drawer.width + T), 0)
      ),
    []
  );

const widthJointSpaces = () =>
  nItems(NUM_SHELVES + 1).reduce(
    (acc, _, i) =>
      acc.concat(widthJointSpace().map(translateByDrawerHeight(i))),
    []
  );

const widthJoint = () =>
  nItems(NUM_DRAWERS).reduce(
    (acc, _, i) =>
      acc.concat(
        widthJointSection().map(translateX(T + i * (drawer.width + T)))
      ),
    []
  );

const widthJoints = () =>
  nItems(NUM_SHELVES + 1).reduce(
    (acc, _, i) => acc.concat(widthJoint().map(translateByDrawerHeight(i))),
    []
  );

// spans full height, all shelves
const heightJointSpace = () =>
  nItems(NUM_SHELVES).reduce(
    (acc, _, i) =>
      acc.concat(
        path
          .rect({
            width: T,
            height: drawer.height
          })
          .translate([0, T + i * (drawer.height + T)])
      ),
    []
  );

const heightJointSpaces = () =>
  nItems(NUM_DRAWERS + 1).reduce(
    (acc, _, i) =>
      acc.concat(heightJointSpace().map(translateByDrawerWidth(i))),
    []
  );

const heightJointSection = fingerJoint({
  width: drawer.height,
  height: T,
  n: 5
});

const heightJoint = () =>
  nItems(NUM_SHELVES)
    .reduce(
      (acc, _, i) =>
        acc.concat(
          heightJointSection()
            .map(translateX(i * (drawer.height + T)))
            .map(translateX(T))
        ),
      []
    )
    .map(rotate(90, [0, 0]));

const heightJoints = () =>
  nItems(NUM_DRAWERS + 1).reduce(
    (acc, _, i) =>
      acc.concat(
        heightJoint()
          .map(translateByDrawerWidth(i))
          .map(translateX(T))
      ),
    []
  );

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
