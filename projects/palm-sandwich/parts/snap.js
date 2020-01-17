const root = require("app-root-path");

const snap = require(`${root}/constructs/cantilever-snap-fit`);
const T = require("../material");

const _snap = snap({ t: T, l2: 0, w3: T * 2, returnAngle: 45 });

module.exports = {
  part: _snap.a
};
