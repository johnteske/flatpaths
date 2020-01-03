// y
const N = 0;
const y = 0.5;
const S = 1;

// x
const W = 0;
const x = 0.5;
const E = 1;

const cardinalToPoint = {
  nw: [W, N],
  ne: [E, N],
  ww: [W, y],
  cc: [x, y],
  ee: [E, y],
  sw: [W, S],
  se: [E, S]
};

module.exports = cardinalToPoint;
