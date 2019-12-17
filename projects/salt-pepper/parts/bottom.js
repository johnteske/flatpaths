const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { inches } = require(`${root}/units`);

const { T } = require("../material");
const { bottomGeometry, bottom } = require("../constructs/panels");
const {
  fingerGeometry,
  makeFingers,
  withFingers,
  withSlots
} = require("../constructs/finger");

const makeLengthFingers = () => {
  const lengthFingers1 = makeFingers(4);
  const lengthFingers2 = makeFingers(4).map(f =>
    f.translate([inches(2.5) + T, 0])
  );

  return [].concat(lengthFingers1, lengthFingers2);
};

const topFingers = makeLengthFingers().map(f =>
  f.translate([0, -fingerGeometry.height])
);

const bottomFingers = makeLengthFingers().map(f =>
  f.translate([0, bottomGeometry.height])
);

const leftFingers = makeFingers(4).map(f => f.rotate(90, [0, 0]));

const rightFingers = makeFingers(4).map(f =>
  f
    .rotate(90, [0, 0])
    .translate([bottomGeometry.width + fingerGeometry.height, 0])
);

const centerSlots = makeFingers(3).map(f =>
  f.rotate(90, [0, 0]).translate([inches(2.5) + fingerGeometry.height, fingerGeometry.width])
);

const bottomPart = pipe(
  withFingers(topFingers),
  withFingers(rightFingers),
  withFingers(bottomFingers),
  withFingers(leftFingers),
  withSlots(centerSlots)
)(bottom());

module.exports = bottomPart;
