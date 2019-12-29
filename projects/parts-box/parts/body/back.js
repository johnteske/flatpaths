const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);

const fingerJoint = require(`${root}/constructs/finger-joint`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const rotate = (...args) => target => target.rotate(...args);
const translate = (...args) => target => target.translate(...args);
const translateX = x => target => target.translate([x, 0]);
//const translateY = y => target => target.translate([0, y]);

const nItems = length => Array.from({ length });

const { width, height } = dimensions;

const panel = path.rect({
  width,
  height
});

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

const translateByShelf = i => translate(0, i * (drawer.height + T));

const widthJointSpaces = () =>
  nItems(NUM_SHELVES + 1).reduce(
    (acc, _, i) => acc.concat(widthJointSpace().map(translateByShelf(i))),
    []
  );

const widthJoint = () =>
  Array.from({ length: NUM_DRAWERS }).reduce(
    (acc, _, i) =>
      acc.concat(
        widthJointSection().map(translate(T + i * (drawer.width + T), 0))
      ),
    []
  );

const widthJoints = () =>
  nItems(NUM_SHELVES + 1).reduce(
    (acc, _, i) => acc.concat(widthJoint().map(translateByShelf(i))),
    []
  );

const translateByDrawerWidth = i => translateX(i * (drawer.width + T));

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
  Array.from({ length: NUM_SHELVES })
    .reduce(
      (acc, _, i) =>
        acc.concat(
          heightJointSection().map(translate(T + i * (drawer.height + T), 0))
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
    //    ...heightJoint()
    //      .map(translate(T, 0))
    //      .map(unite),
    //    ...heightJoint()
    //      .map(translate(width, 0))
    //      .map(unite)
  )(panel);

module.exports = back;
