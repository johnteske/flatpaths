const root = require("app-root-path");

const snap = require(`${root}/constructs/cantilever-snap-fit`);
const T = require("../material");

const _snap = snap({
  t: T,
  l2: 0,
  w1: T * 0.75,
  w2: T * 1.5,
  w3: T * 2,
  w5: T * 0.75,
  l1: T * 1,
  l3: T * 1,
  slipAngle: 75,
  returnAngle: 75
});

module.exports = {
  part: _snap.a
};
