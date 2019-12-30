const root = require("app-root-path");

const path = require(`${root}/path`);
const { nItems } = require(`${root}/fn`);
const { translateX } = require(`${root}/transform`);

const isOdd = i => i % 2 === 0;
const isEven = i => i % 2 === 1;

const fingerJoint = ({ width, height, n }) => {
  const fingerWidth = width / n;
  const finger = () =>
    path.rect({
      width: fingerWidth,
      height
    });

  const makeFingers = indexComparison =>
    nItems(n)
      .map((_, i) =>
        indexComparison(i) ? translateX(i * fingerWidth)(finger()) : null
      )
      .filter(v => v != null);

  return {
    a: () => makeFingers(isOdd),
    b: () => makeFingers(isEven)
  };
};

module.exports = fingerJoint;
