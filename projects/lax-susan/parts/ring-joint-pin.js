const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const { unite } = require(`${root}/boolean`);
const { mm } = require(`${root}/units`);
const path = require(`${root}/path`);

const { T, ringT } = require("../parameters.js");

const body = path.rect({ width: ringT, height: ringT });
const finger = path.rect({ width: T, height: T + ringT + T, radius: mm(0.5) });

module.exports = () =>
  pipe(unite(finger.clone().translate([T, -T])))(body.clone()).translate([
    0,
    T
  ]);
