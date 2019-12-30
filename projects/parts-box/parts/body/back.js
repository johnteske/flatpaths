const root = require("app-root-path");

const { pipe, nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);
const path = require(`${root}/path`);
const {
  rotate,
  translateX,
  translateY,
  flipH,
  flipV
} = require(`${root}/transform`);

const {
  fingerJoint,
  applyFingerJoint
} = require(`${root}/constructs/finger-joint2`);

const drawer = require("../../constructs/drawer");
const dimensions = require("../../dimensions");
const { T } = require("../../material");

const { NUM_DRAWERS, NUM_SHELVES } = dimensions;

const { width, height } = dimensions;

//

const panel = path.rect({
  width,
  height
});

const translateByDrawerWidth = i => translateX(i * (drawer.width + T));
const translateByDrawerHeight = i => translateY(i * (drawer.height + T));

const widthJointSection = radius =>
  fingerJoint({
    width: drawer.width,
    height: T,
    n: 5,
    radius
  }).a();

const widthJoint = r =>
  nItems(NUM_DRAWERS).flatMap((_, i) =>
    widthJointSection(r).translate(T + i * (drawer.width + T), 0)
  );

const widthJoints = () =>
  nItems(NUM_SHELVES - 1).flatMap((_, i) =>
    widthJoint(0).map(translateByDrawerHeight(i + 1))
  );

const heightJointSection = radius =>
  fingerJoint({
    width: drawer.height,
    height: T,
    n: 5,
    radius
  }).a();

const heightJoint = r =>
  nItems(NUM_SHELVES)
    .flatMap((_, i) =>
      heightJointSection(r).translate(T + i * (drawer.height + T), 0)
    )
    .map(rotate(90, [0, 0]))
    .map(translateX(T));

const heightJoints = () =>
  nItems(NUM_DRAWERS - 1).flatMap((_, i) =>
    heightJoint(0)
      .map(translateByDrawerWidth(i + 1))
      .map(translateX(T))
  );

const back = () =>
  pipe(
    // top
    ...widthJoint(mm(0.5)).flatMap(applyFingerJoint),
    // middle
    ...widthJoints().flatMap(applyFingerJoint),
    // bottom
    ...widthJoint(mm(0.5))
      .map(translateByDrawerHeight(NUM_SHELVES))
      .map(flipV)
      .flatMap(applyFingerJoint),
    // left
    ...heightJoint(mm(0.5))
      .map(flipH)
      .flatMap(applyFingerJoint),
    // middle
    ...heightJoints().flatMap(applyFingerJoint),
    // right
    ...heightJoint(mm(0.5))
      .map(translateByDrawerWidth(NUM_DRAWERS))
      .flatMap(applyFingerJoint)
  )(panel);

module.exports = back;
