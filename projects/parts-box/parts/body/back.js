const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);

const fingerJoint = require(`${root}/constructs/finger-joint`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { NUM_DRAWERS } = dimensions;

const panel = path.rect({
  width: dimensions.width,
  height: dimensions.height
});

const widthJointSection = fingerJoint({
  width: drawer.width,
  height: T,
  n: 5
});

const translate = (...args) => target => target.translate(args);

const widthJoint = () => Array.from({ length: NUM_DRAWERS }).reduce(
  (acc, _, i) =>
    acc.concat(
      widthJointSection().map(translate(T + i * (drawer.width + T), 0))
    ),
  []
);

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
    ...widthJoint()
      .map(unite),
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
      .map(unite)
   )(panel);

module.exports = back;
