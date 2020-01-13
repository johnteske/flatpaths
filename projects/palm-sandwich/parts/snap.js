const root = require("app-root-path");

const snap = require(`${root}/constructs/cantilever-snap-fit`);

const _snap = snap({ t: 10 });

module.exports = {
  part: _snap.a
};
