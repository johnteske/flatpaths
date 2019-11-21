const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { inches, mm } = require(`${root}/units`);

const { bottomGeometry, bottom } = require("../constructs/panels");
const {
  fingerGeometry,
  makeFingers,
  withFingers
} = require("../constructs/finger");

const makeLengthFingers = () => {
  const lengthFingers1 = makeFingers(5);
  const lengthFingers2 = makeFingers(5).map(
    f => f.translate([inches(2.5) + mm(3) + inches(0.25), 0]) // TODO 5 in + T
  );

  return [].concat(lengthFingers1, lengthFingers2);
};

const topFingers = makeLengthFingers().map(f =>
  f.translate([0, -fingerGeometry.height])
);

const bottomFingers = makeLengthFingers().map(f =>
  f.translate([0, bottomGeometry.height])
);

const leftFingers = makeFingers(5).map(f => f.rotate(90, [0, 0]));

const rightFingers = makeFingers(5).map(f =>
  f
    .rotate(90, [0, 0])
    .translate([bottomGeometry.width + fingerGeometry.height, 0])
);

// TODO needs support in the middle, also needs slots down center
const bottomPart = pipe(
  withFingers(topFingers),
  withFingers(rightFingers),
  withFingers(bottomFingers),
  withFingers(leftFingers)
)(bottom());

module.exports = bottomPart;
