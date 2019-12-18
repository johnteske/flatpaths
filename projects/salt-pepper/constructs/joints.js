const root = require("app-root-path");

const { inches } = require(`${root}/units`);

const { T } = require("../material");

const {
  makeFingers
} = require("./finger");

const bottomLengthFingers = () => {
  const lengthFingers1 = makeFingers(4);
  const lengthFingers2 = makeFingers(4).map(f =>
    f.translate([inches(2.5) + T, 0])
  );

  return [].concat(lengthFingers1, lengthFingers2);
};

// TODO the width of these fingers should be length.height + T / 4
const widthLengthFingers = () => makeFingers(2).map(f => f.rotate(90, [0, 0]));

module.exports = {
  bottomLengthFingers,
  widthLengthFingers
};
