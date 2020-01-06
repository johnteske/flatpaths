const root = require("app-root-path");

const { intersect, subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

const { r, ringT } = require("../parameters.js");
const ringJointPattern = require("../constructs/ring-joint.js");

const outer = path.circle({ radius: r, x: r, y: r });
const inner = path.circle({ radius: r - ringT, x: r, y: r });
const mask = path.rect({ width: r, height: r });

const segment = () =>
  pipe(
    subtract(inner.clone()),
    intersect(mask.clone()),
    ...ringJointPattern(3).map(subtract)
  )(outer.clone());

module.exports = segment;
