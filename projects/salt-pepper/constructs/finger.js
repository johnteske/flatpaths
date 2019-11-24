const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { subtract, unite } = require(`${root}/boolean`);
const { inches } = require(`${root}/units`);
const path = require(`${root}/path`);

const { T } = require(`../material`);

const fingerGeometry = {
  width: inches(0.25),
  height: T
};

const _finger = path.rect(fingerGeometry);
const finger = () => _finger.clone();

const makeFingers = n => {
  let fingers = [];
  for (let i = 0; i < n; i++) {
    fingers.push(finger().translate([i * 2 * fingerGeometry.width, 0]));
  }
  return fingers;
};

const withFingers = fingers => pipe(...fingers.map(s => unite(s)));
const withSlots = fingers => pipe(...fingers.map(s => subtract(s)));

module.exports = {
  fingerGeometry,
  finger,
  makeFingers,
  withFingers,
  withSlots
};
