const root = require("app-root-path");
const paper = require("paper-jsdom");

const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const cards = require(`${root}/objects/cards`);

const T = require("../material");
const mask = require("../constructs/half-mask");
const { cardOuter, pins, supportHoles } = require("../constructs/card-outer");
const cardCutout = require("../constructs/card-cutout");
const snapReceiver = require("../constructs/snap-receiver");
const { cardOuterGeometry } = require("../constructs/card-outer");

const _part = pipe(
  ...pins().map(subtract),
  ...supportHoles().map(subtract),
  unite(snapReceiver.coverTranslated()),
  subtract(cardCutout())
)(cardOuter());

const part = () => _part.clone();

const frameTVertical = (cardOuterGeometry.height - cards.h) / 2;
const jointThinY = (frameTVertical - T) / 2;
const jointThickY = (frameTVertical - T * 2) / 2;

const joint = new paper.CompoundPath([
  [0, jointThinY],
  [T * 2, jointThickY],
  [T * 2, frameTVertical - jointThickY],
  [0, frameTVertical - jointThinY],
  [0, jointThinY] // close path
]);

const jointTop = () => joint.clone().translate(cardOuterGeometry.width / 2, 0);

const jointBottom = () =>
  joint
    .clone()
    .scale(-1, -1)
    .translate(
      cardOuterGeometry.width / 2 - T * 2,
      cardOuterGeometry.height - frameTVertical
    );

const a = () =>
  part()
    .subtract(
      mask()
        .translate([cardOuterGeometry.width / 2, 0])
        .scale(1, 9)
    )
    .unite(jointTop())
    .subtract(jointBottom());

const b = () => {
  const _ = part()
    .subtract(mask())
    .subtract(jointTop())
    .unite(jointBottom());
  _.bounds.topLeft = [0, 0];
  return _;
};

module.exports = {
  joint: () => joint.clone(),
  components: () => [a(), b()],
  part
};
