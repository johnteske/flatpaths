const root = require("app-root-path");

const { inches } = require(`${root}/units`);
const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

const { r } = require("../parameters.js");
const ringJointPattern = require("../constructs/ring-joint.js");

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
    ...ringJointPattern(12).map(subtract)
  )(outer.clone());
