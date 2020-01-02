const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { unite, subtract } = require(`${root}/boolean`);
const { pipe, nItems } = require(`${root}/fn`);
const { translateX } = require(`${root}/transform`);

//

const isOdd = i => i % 2 === 0;
const isEven = i => i % 2 === 1;

const fingerJoint = ({ width, height, n, radius }) => {
  if (radius >= height / 2) {
    throw new Error("finger joint radius is too large");
  }

  const area = path.rect({ width, height, name: "finger-joint-area" });

  const fingerWidth = width / n;
  const fingerCornerRadius = radius || 0;

  const fingerTip = path.rect({
    width: fingerWidth,
    height,
    radius: fingerCornerRadius
  });

  const fingerBase = path.rect({
    width: fingerWidth,
    height: height / 2,
    y: height / 2
  });

  // TODO allow left- and rightmost finger tips to be square
  const finger = radius !== 0 ? fingerTip.unite(fingerBase) : fingerTip;
  fingerTip.remove();
  fingerBase.remove();

  const makeFingers = indexComparison =>
    nItems(n)
      .map((_, i) =>
        indexComparison(i) ? translateX(i * fingerWidth)(finger.clone()) : null
      )
      .filter(v => v != null);

  return {
    a: () => group(area.clone(), ...makeFingers(isOdd)),
    b: () => group(area.clone(), ...makeFingers(isEven))
  };
};

const applyFingerJoint = joint => [
  ...joint.children.filter(v => v.name === "finger-joint-area").map(subtract),
  ...joint.children.filter(v => v.name !== "finger-joint-area").map(unite)
];

// TODO this may be the preferred way to apply
const pipeFingerJoint = joint => target =>
  pipe(
    ...joint.children.filter(v => v.name === "finger-joint-area").map(subtract),
    ...joint.children.filter(v => v.name !== "finger-joint-area").map(unite)
  )(target);

module.exports = {
  fingerJoint,
  applyFingerJoint,
  pipeFingerJoint
};
