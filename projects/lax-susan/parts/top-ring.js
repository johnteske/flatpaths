const root = require("app-root-path");

const { inches, mm } = require(`${root}/units`);
const { intersect, subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

// TODO dup
const r = inches(5);
const T = mm(3.3);

const ringT = T * 3;

const pilotHoleDiameter = inches(5 / 32);
const hole = path.circle({ radius: pilotHoleDiameter / 2, x: ringT / 2, y: r });

const outer = path.circle({ radius: r, x: r, y: r });
const inner = path.circle({ radius: r - ringT, x: r, y: r });
const mask = path.rect({ width: r, height: r });

const segment = () =>
  pipe(
    subtract(inner.clone()),
    intersect(mask.clone()),
    subtract(hole.clone().rotate(15, [r, r])),
    subtract(hole.clone().rotate(45, [r, r])),
    subtract(hole.clone().rotate(75, [r, r]))
  )(outer.clone());

module.exports = segment;
