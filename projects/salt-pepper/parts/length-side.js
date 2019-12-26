const root = require("app-root-path");

const { unite } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
const { inches } = require(`${root}/units`);
const { T } = require(`../material`);

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
    withSlots(
      widthLengthFingers().map(f =>
        f.translate([
          inches(2.5) + T,
          (inches(1.25) + T) / 4 - T // TODO get from finger function
        ])
      )
    ),
    withFingers(
      widthLengthFingers().map(f =>
        f.translate([
          lengthSideGeometry.width + fingerGeometry.height,
          -fingerGeometry.height
        ])
      )
    ),
    // bottom standoff
    unite(
      path.rect({
        x: -T,
        y: -2 * T,
        width: T + inches(2.5) + T + inches(2.5) + T,
        height: T
      })
    )
  )(lengthSide())
    .translate([fingerGeometry.height, 2 * T])
    .scale(1, -1);

module.exports = lengthSidePart;
