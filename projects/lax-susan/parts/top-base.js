const root = require("app-root-path");

const { inches, mm } = require(`${root}/units`);
const { subtract } = require(`${root}/boolean`);
const { pipe, nItems } = require(`${root}/fn`);
const path = require(`${root}/path`);

// TODO dup
const r = inches(5);
const T = mm(3.3);

const boltSquare = inches(2.625); // like diameter
const boltR = boltSquare / 2; // like radius
const boltPoints = [
  [-boltR, -boltR],
  [boltR, -boltR],
  [-boltR, boltR],
  [boltR, boltR]
];

const pilotHoleDiameter = inches(5 / 32);
const hole2 = path.circle({ radius: pilotHoleDiameter / 2 });

const ringT = T * 3;

//const pilotHoleDiameter = inches(5 / 32);
const hole = path.circle({ radius: pilotHoleDiameter / 2, x: ringT / 2, y: r });

const outer = path.circle({ radius: r, x: r, y: r });

module.exports = () =>
  pipe(
    //subtract(hole.clone().translate(boltPoints[0]))
    ...boltPoints
      .map(point =>
        hole2
          .clone()
          .translate(r)
          .translate(point)
      )
      .map(subtract),
    ...nItems(12)
      .map((_, i) => hole.clone().rotate(15 + i * 30, [r, r]))
      .map(subtract)
  )(outer.clone());
