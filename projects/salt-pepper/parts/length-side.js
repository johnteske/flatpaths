const root = require("app-root-path");

const { unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);

const { lengthSide, lengthSideGeometry } = require("../constructs/panels");

const {
  fingerGeometry,
  withFingers,
  withSlots
} = require("../constructs/finger");

const {
  bottomLengthFingers,
  widthLengthFingers
} = require("../constructs/joints");

const lengthSidePart = () =>
  pipe(
    unite(
      path.rect({
        width:
          fingerGeometry.height +
          lengthSideGeometry.width +
          fingerGeometry.height,
        height: fingerGeometry.height,
        x: -fingerGeometry.height,
        y: -fingerGeometry.height
      })
    ),
    withSlots(
      bottomLengthFingers().map(f => f.translate([0, -fingerGeometry.height]))
    ),
    withFingers(
      widthLengthFingers().map(f => f.translate([0, -fingerGeometry.height]))
    ),
    withFingers(
      widthLengthFingers().map(f =>
        f.translate([
          lengthSideGeometry.width + fingerGeometry.height,
          -fingerGeometry.height
        ])
      )
    )
  )(lengthSide())
    .translate([fingerGeometry.height])
    .scale(1, -1);

module.exports = lengthSidePart;
