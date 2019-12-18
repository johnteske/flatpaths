const root = require("app-root-path");

//const { pipe } = require(`${root}/fn`);
const { inches } = require(`${root}/units`);

const { T } = require("../material");

const {
  //  fingerGeometry,
  makeFingers
  //withFingers,
  //withSlots
} = require("./finger");

const bottomLengthFingers = () => {
  const lengthFingers1 = makeFingers(4);
  const lengthFingers2 = makeFingers(4).map(f =>
    f.translate([inches(2.5) + T, 0])
  );

  return [].concat(lengthFingers1, lengthFingers2);
};

module.exports = {
  bottomLengthFingers
};
