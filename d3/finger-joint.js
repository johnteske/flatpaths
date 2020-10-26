const root = require("app-root-path");
const { nItems } = require(`${root}/fn`);

// is this more accurately a "box joint"?
// https://en.wikipedia.org/wiki/Box_joint
// or maybe it depends on how it is used

// one finger, open, facing north
const fingerPoints = (width, height) => [
  [0, 0],
  [0, -height],
  [width, -height],
  [0, -height]
];

// slot
const slotPoints = (width, height) =>
  fingerPoints(width, height).concat([[0, 0]]);

// fingers
// TODO accept stroke-dasharray -like syntax for spacing/bias
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
const fingers = (fingerWidth, fingerHeight, n) =>
  nItems(n).flatMap((_, i) =>
    fingerPoints(fingerWidth, fingerHeight).map(([x, y]) => [
      x + i * fingerWidth * 2,
      y
    ])
  );

module.exports = {
  fingerPoints,
  slotPoints,
  fingers
};
