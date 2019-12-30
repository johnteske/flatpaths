const root = require("app-root-path");

const { pipe, nItems } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);
const path = require(`${root}/path`);
const { rotate, translateX, translateY, flipV } = require(`${root}/transform`);

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

const heightJointSection = fingerJoint({
  width: drawer.height,
  height: T,
  n: 5
}).a;

const heightJoint = () =>
  nItems(NUM_SHELVES)
    .flatMap((_, i) =>
      heightJointSection().translate(T + i * (drawer.height + T), 0)
    )
    .map(rotate(90, [0, 0]));

const heightJoints = () =>
  nItems(NUM_DRAWERS + 1).flatMap((_, i) =>
    heightJoint()
      .map(translateByDrawerWidth(i))
      .map(translateX(T))
  );

const back = () =>
  pipe(
    ...widthJoint(mm(0.5)).flatMap(applyFingerJoint),
    ...widthJoints().flatMap(applyFingerJoint),
    ...widthJoint(mm(0.5))
      .map(translateByDrawerHeight(NUM_SHELVES))
      .map(flipV)
      .flatMap(applyFingerJoint),
    ...heightJoints().flatMap(applyFingerJoint)
  )(panel);

module.exports = back;
