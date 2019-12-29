const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);

const fingerJoint = require(`${root}/constructs/finger-joint`);

const dimensions = require("../../dimensions");
const { T } = require("../../material");

const panel = path.rect({
  width: dimensions.width,
  height: dimensions.height
});

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

    ...fingerJoint({
      width: dimensions.width,
      height: T,
      n: 7
    })().map(unite)
  )(panel);

module.exports = back;
