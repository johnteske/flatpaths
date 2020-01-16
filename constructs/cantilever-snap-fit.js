/*
Based on:
https://lasercutlikeaboss.weebly.com/uploads/2/7/8/8/27883957/advancedjoinery_master_web.pdf
*/

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

const snap = ({
  t, // thickness of material
  l1, // height of gutter 1 (strength..flexibility in pushing towards center)
  l2, // length of the nose face
  l3, // height of gutter 2 (strength..flexibility in pulling towards center)
  // l4, // useable length of finger, must be longer than `t`,
  w1, // width of finger, must be less than w2
  w2, // overhang width, use w1 + w4 as default, must not be greater than w1 + w4
  w3, // slot width, between the insides of fingers
  w4, // width of inside gutter (strength..flexibility), limits deformation towards center
  w5, // width of outside gutter (strength..flexibility), limits deformation away from center
  slipAngle = 45, // angle of the nose leading edge (..ease)
  returnAngle = 0 // angle of the nose underside edge (permanance..reversible/slop)
}) => {
  l1 = l1 || t * 4;
  l2 = l2 || t;
  l3 = l3 || t * 4;
  w1 = w1 || t;

  w4 = w4 || t;
  w2 = w2 || w1 + w4;

  w3 = w3 || t * 4;
  w5 = w5 || t;

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

  const height = slipY + l2 + returnY + t + gutterFillHeight;

  const outerEdge = path.rect({
    width: t,
    height
  });

  //  const slotContact = path.rect({
  //    width: halfSlotWidth,
  //    height: gutterFillHeight
  //  });

  // snap
  const _a = pipe(
    // outer gutter
    unite(
      path.rect({
        width: w5,
        height: gutterFillHeight,
        x: t, // outerEdge width
        y: height - gutterFillHeight
      })
    ),
    // TODO subtract circle from outer gutter
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
        height: gutterFillHeight,
        x: t + w5 + w1,
        y: height - gutterFillHeight
      })
    ),
    // TODO subtract circle from inner gutter
    //    unite(slotContact)
    unite(
      path.rect({
        width: halfSlotWidth,
        height: gutterFillHeight,
        x: t + w5 + w1 + w4,
        y: height - gutterFillHeight
      })
    )
  )(outerEdge);

  return {
    a: () => _a.clone(),
    b: () => {} // receiving
  };
};

module.exports = snap;
