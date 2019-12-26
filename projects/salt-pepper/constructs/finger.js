const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const { inches } = require(`${root}/units`);

const { T } = require(`../material`);

const fingerGeometry = {
  width: inches(2.5) / 7,
  height: T
};

const withFingers = fingers => pipe(...fingers.map(s => unite(s)));
const withSlots = fingers => pipe(...fingers.map(s => subtract(s)));

module.exports = {
  fingerGeometry,
  withFingers,
  withSlots
};
