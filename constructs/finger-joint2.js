// TODO
// - B part
// - allow left- and rightmost finger tips to be square

const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { unite, subtract } = require(`${root}/boolean`);
const { nItems } = require(`${root}/fn`);
const { translateX } = require(`${root}/transform`);

//

const isOdd = i => i % 2 === 0;
const isEven = i => i % 2 === 1;

const fingerJoint = ({ width, height, n, radius }) => {
  if (radius >= height / 2) {
    throw new Error("finger joint radius is too large");
  }

  const area = () => path.rect({ width, height, name: "finger-joint-area" });

  const fingerWidth = width / n;
  const fingerCornerRadius = radius || 0;
  const finger = () =>
    path
      // TODO skip this operation if radius is 0
      .rect({
        width: fingerWidth,
        height,
        radius: fingerCornerRadius
      })
      .unite(
        path.rect({
          width: fingerWidth,
          height: height / 2,
          y: height / 2
        })
      );

  const makeFingers = indexComparison =>
    nItems(n)
      .map((_, i) =>
        indexComparison(i) ? translateX(i * fingerWidth)(finger()) : null
      )
      .filter(v => v != null);

  return {
    a: () => group(area(), ...makeFingers(isOdd)),
    b: () => makeFingers(isEven)
  };
};

const applyFingerJoint = joint => [
  ...joint.children.filter(v => v.name === "finger-joint-area").map(subtract),
  ...joint.children.filter(v => v.name !== "finger-joint-area").map(unite)
];

module.exports = {
  fingerJoint,
  applyFingerJoint
};
