const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);
const { flipH, flipV } = require(`${root}/transform`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const drawer = require("../../constructs/drawer");
const shelfBackJoint = require("../../constructs/shelf-back-joint");
const shelfSideJoint = require("../../constructs/shelf-side-joint");
const dimensions = require("../../dimensions");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const { width, height } = dimensions;

//

const panel = path.rect({
  width,
  height
});

const back = () =>
  pipe(
    // top
    ...shelfBackJoint.joint("a").flatMap(applyFingerJoint),
    // middle
    ...shelfBackJoint.interiorJoints().flatMap(applyFingerJoint),
    // bottom
    ...shelfBackJoint
      .joint("a")
      .map(drawer.translateByHeights(NUM_SHELVES))
      .map(flipV)
      .flatMap(applyFingerJoint),
    // left
    ...shelfSideJoint
      .joint("a")
      .map(flipH)
      .flatMap(applyFingerJoint),
    // middle
    ...shelfSideJoint.interiorJoints("a").flatMap(applyFingerJoint),
    // right
    ...shelfSideJoint
      .joint("a")
      .map(drawer.translateByWidths(NUM_DRAWERS))
      .flatMap(applyFingerJoint)
  )(panel);

module.exports = back;
