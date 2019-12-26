const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { inches } = require(`${root}/units`);

const { T } = require("../material");

const { bottomGeometry, bottom } = require("../constructs/panels");
const { withFingers } = require("../constructs/finger");
const {
  bottomLengthFingers,

  bottomWidthFingers
} = require("../constructs/joints");

const topFingers = bottomLengthFingers().map(f => f.translate([0, -T]));

const bottomFingers = bottomLengthFingers().map(f =>
  f.translate([0, bottomGeometry.height])
);

const rotatedFingers = () =>
  bottomWidthFingers().map(f => f.rotate(90, [0, 0]));

const leftFingers = rotatedFingers();

const rightFingers = rotatedFingers().map(f =>
  f.translate([bottomGeometry.width + T, 0])
);

const centerFingers = rotatedFingers().map(f =>
  f.translate([inches(2.5) + T, 0])
);

const bottomPart = () =>
  pipe(
    withFingers(topFingers),
    withFingers(rightFingers),
    withFingers(bottomFingers),
    withFingers(leftFingers),
    withFingers(centerFingers)
  )(bottom()).translate([T]);

module.exports = bottomPart;
