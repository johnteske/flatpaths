const root = require("app-root-path");

const path = require(`${root}/path`);
const { nItems } = require(`${root}/fn`);
const { translateX } = require(`${root}/transform`);

const isOdd = i => i % 2 === 0;

const fingerJoint = ({ width, height, n }) => {
  const _fingerWidth = width / n;
  const _finger = () =>
    path.rect({
      width: _fingerWidth,
      height
    });

  return () =>
    nItems(n)
      .map((_, i) =>
        isOdd(i) ? translateX(i * _fingerWidth)(_finger()) : null
      )
      .filter(v => v != null);
};

module.exports = fingerJoint;
