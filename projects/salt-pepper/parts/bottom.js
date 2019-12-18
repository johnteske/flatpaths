const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { inches } = require(`${root}/units`);

const { bottomGeometry, bottom } = require("../constructs/panels");
const {
  fingerGeometry,
  makeFingers,
  withFingers,
  withSlots
} = require("../constructs/finger");
const { bottomLengthFingers } = require("../constructs/joints");

const topFingers = bottomLengthFingers().map(f =>
  f.translate([0, -fingerGeometry.height])
);

const bottomFingers = bottomLengthFingers().map(f =>
  f.translate([0, bottomGeometry.height])
);

const leftFingers = makeFingers(4).map(f => f.rotate(90, [0, 0]));

const rightFingers = makeFingers(4).map(f =>
  f
    .rotate(90, [0, 0])
    .translate([bottomGeometry.width + fingerGeometry.height, 0])
);

const centerSlots = makeFingers(3).map(f =>
  f
    .rotate(90, [0, 0])
    .translate([inches(2.5) + fingerGeometry.height, fingerGeometry.width])
);

const bottomPart = () =>
  pipe(
    withFingers(topFingers),
    withFingers(rightFingers),
    withFingers(bottomFingers),
    withFingers(leftFingers),
    withSlots(centerSlots)
  )(bottom()).translate([fingerGeometry.height]);

module.exports = bottomPart;
