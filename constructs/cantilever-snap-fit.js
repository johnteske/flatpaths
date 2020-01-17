/*
Based on:
https://lasercutlikeaboss.weebly.com/uploads/2/7/8/8/27883957/advancedjoinery_master_web.pdf
*/

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

const snap = ({
  t, // thickness of material
  l1, // height of outer gutter (strength..flexibility in pushing towards center)
  l2, // length of the nose face
  l3, // height of inside gutter (strength..flexibility in pulling towards center)
  // l4, // useable length of finger, must be longer than `t`,
  w1, // width of finger, must be less than w2
  w2, // overhang width, use w1 + w4 as default, must not be greater than w1 + w4
  w3, // slot width, between the insides of fingers
  w4, // width of inside gutter (strength..flexibility), limits deformation towards center
  w5, // width of outside gutter (strength..flexibility), limits deformation away from center
  slipAngle = 45, // angle of the nose leading edge (..ease)
  returnAngle = 0 // angle of the nose underside edge (permanance..reversible/slop)
}) => {
  l1 = typeof l1 !== "undefined" ? l1 : t * 2;
  l2 = typeof l2 !== "undefined" ? l2 : t;
  l3 = typeof l3 !== "undefined" ? l3 : t * 2;
  w1 = typeof w1 !== "undefined" ? w1 : t;

  w4 = typeof w4 !== "undefined" ? w4 : t;
  w2 = typeof w2 !== "undefined" ? w2 : w1 + w4;

  w3 = typeof w3 !== "undefined" ? w3 : t * 4;
  w5 = typeof w5 !== "undefined" ? w5 : t;

  const gutterFillHeight = Math.max(l1, l3);
  const halfSlotWidth = w3 / 2;

  const fingerY = deg => {
    const radians = deg * (Math.PI / 180);

    const adjacent = w2 - w1;
    const opposite = adjacent * Math.tan(radians);

    return opposite;
  };

  const slipY = fingerY(slipAngle);
  const returnY = fingerY(returnAngle);

  const l4 = slipY + l2 + returnY + t;
  const height = l4 + gutterFillHeight;

  const outerEdge = path.rect({
    width: t,
    height
  });

  // snap
  const _aHalf = pipe(
    // outer gutter
    // fill
    unite(
      path.rect({
        width: w5,
        height: height - l4 - l1 + w5 / 2,
        x: t, // outerEdge width
        y: l4 + l1 - w5 / 2 // minus radius
      })
    ),
    subtract(
      path.circle({
        x: t + w5 / 2,
        y: l4 + l1 - w5 / 2,
        radius: w5 / 2
      })
    ),
    // finger
    unite(
      path.rect({
        width: w1,
        height,
        x: t + w5
      })
    ),
    // finger tip
    unite(
      new paper.CompoundPath([
        [w1, 0],
        [w2, slipY],
        [w2, slipY + l2],
        [w1, slipY + l2 + returnY],
        [w1, 0] // close
      ]).translate(t + w5, 0)
    ),
    // inner gutter
    unite(
      path.rect({
        width: w4,
        height: height - l4 - l3 + w4 / 2,
        x: t + w5 + w1,
        y: l4 + l3 - w4 / 2 // minus radius
      })
    ),
    subtract(
      path.circle({
        x: t + w5 + w1 + w4 / 2,
        y: l4 + l3 - w4 / 2,
        radius: w4 / 2
      })
    ),
    unite(
      path.rect({
        width: halfSlotWidth,
        height: gutterFillHeight,
        x: t + w5 + w1 + w4,
        y: height - gutterFillHeight
      })
    )
  )(outerEdge);

  const halfWidth = t + w5 + w1 + w4 + halfSlotWidth;

  const _a = _aHalf.clone().unite(
    _aHalf
      .clone()
      .scale(-1, 1)
      .translate(halfWidth, 0)
  );

  return {
    a: () => _a.clone(),
    b: () => {} // receiving
  };
};

module.exports = snap;
