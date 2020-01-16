/*
Based on:
https://lasercutlikeaboss.weebly.com/uploads/2/7/8/8/27883957/advancedjoinery_master_web.pdf
*/

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const snap = ({
  t, // thickness of material
  l1 = mm(3), // height of gutter 1 (strength..flexibility in pushing towards center)
  // l2 = mm(3), // length of the nose face (calculated)
  l3 = mm(3), // height of gutter 2 (strength..flexibility in pulling towards center)
  // l4 = mm(6), // useale length of finger, must be longer than `t`,
  w1 = mm(3), // width of finger, must be less than w2
  w2, // overhang width, use w1 + w4 as default, must not be greater than w1 + w4
  w3 = mm(12), // slot width, between the insides of fingers
  w4 = mm(3), // width of inside gutter (strength..flexibility), limits deformation towards center
  w5 = mm(3), // width of outside gutter (strength..flexibility), limits deformation away from center
  slipAngle = 15, // angle of the nose leading edge (..ease)
  returnAngle = 45 // angle of the nose underside edge (permanance..reversible/slop)
}) => {
  w2 = w2 || w1 + w4;

  const gutterFillHeight = Math.max(l1, l3);
  const halfSlotWidth = w3 / 2;

  const l4 = 100; // t + TODO_finger
  const height = gutterFillHeight + l4;

  // trig
  const degToRadians = deg => deg * (Math.PI / 180)
  const a = degToRadians(slipAngle)
  //const b = degToRadians(90)
  //c?
  const adjacent = w2 - w1
  const opposite = adjacent * Math.tan(a)
  // trig

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
    // TODO subtract from gutter
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
        [0, 0],
        [w1, 0],
        [w2, opposite], // TODO
        [w2, 20], // TODO
        [0, 20], //TODO
        [0, 0]
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
    // TODO subtract from gutter
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

  // fit
  //const b

  return {
    a: () => _a.clone(),
    b: () => {}
  };
};

module.exports = snap;
