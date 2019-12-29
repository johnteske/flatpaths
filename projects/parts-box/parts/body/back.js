const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);

const fingerJoint = require(`${root}/constructs/finger-joint`);

const thing = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { NUM_DRAWERS } = dimensions;

const panel = path.rect({
  width: dimensions.width,
  height: dimensions.height
});

const widthJointSection = fingerJoint({
  width: thing.width,
  height: T,
  n: 5
});

const translate = (...args) => target => target.translate(args);

const widthJoint = Array.from({ length: NUM_DRAWERS }).reduce(
  (acc, _, i) =>
    acc.concat(
      widthJointSection().map(translate(T + i * (thing.width + T), 0))
    ),
  []
);

// dimensions are external--
// --finger joints will be inside these dimensions
const back = () =>
  pipe(
    subtract(
      // remove top joint material
      path.rect({
        width: dimensions.width,
        height: T
      })
    ),

    ...widthJoint
      //      .map(translate(T, 0))
      .map(unite)
  )(panel);

module.exports = back;
