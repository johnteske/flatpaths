const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { guide } = require(`${root}/stroke`);

const fingerJoint = require(`${root}/constructs/finger-joint`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const rotate = (...args) => target => target.rotate(...args);
const translate = (...args) => target => target.translate(...args);

const panel = path.rect({
  width: dimensions.width,
  height: dimensions.height
});

const widthJointSection = fingerJoint({
  width: drawer.width,
  height: T,
  n: 5
});

const widthJoint = () =>
  Array.from({ length: NUM_DRAWERS }).reduce(
    (acc, _, i) =>
      acc.concat(
        widthJointSection().map(translate(T + i * (drawer.width + T), 0))
      ),
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

//heightJoint()
//  .map(translate(T, 0))
//  .map(guide)

// dimensions are external--
// --finger joints will be inside these dimensions
const back = () =>
  pipe(
    // top
    subtract(
      path.rect({
        width: dimensions.width,
        height: T
      })
    ),
    ...widthJoint().map(unite),
    // bottom
    subtract(
      path.rect({
        y: dimensions.height - T,
        width: dimensions.width,
        height: T
      })
    ),
    ...widthJoint()
      .map(translate(0, dimensions.height - T))
      .map(unite),
    // left
    subtract(
      path.rect({
        width: T,
        height: dimensions.height
      })
    ),
    ...heightJoint()
      .map(translate(T, 0))
      .map(unite),
    // right
    subtract(
      path.rect({
        x: dimensions.width - T,
        width: T,
        height: dimensions.height
      })
    ),
    ...heightJoint()
      .map(translate(dimensions.width, 0))
      .map(unite)
  )(panel);

module.exports = back;
