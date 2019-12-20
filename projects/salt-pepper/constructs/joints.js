const root = require("app-root-path");

const { inches } = require(`${root}/units`);
const fingerJoint = require(`${root}/constructs/finger-joint`);

const { T } = require("../material");

const makeFingers = fingerJoint({
  width: inches(2.5),
  height: T,
  n: 7
});

const bottomLengthFingers = () => {
  const lengthFingers1 = makeFingers(4);
  const lengthFingers2 = makeFingers(4).map(f =>
    f.translate([inches(2.5) + T, 0])
  );

  return [].concat(lengthFingers1, lengthFingers2);
};

const widthLengthFingers = () =>
  fingerJoint({ width: inches(1.25) + T, height: T, n: 4 })().map(f =>
    f.rotate(90, [0, 0])
  );

const bottomWidthFingers = () =>
  fingerJoint({ width: inches(2.5), height: T, n: 7 })();

module.exports = {
  bottomLengthFingers,
  widthLengthFingers,
  bottomWidthFingers
};
