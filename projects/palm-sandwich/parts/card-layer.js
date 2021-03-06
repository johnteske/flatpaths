const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins, supportHoles } = require("../constructs/card-outer");
const cardCutout = require("../constructs/card-cutout");
const { cardOuterGeometry } = require("../constructs/card-outer");

const _part = pipe(
  ...pins().map(subtract),
  ...supportHoles().map(subtract),
  subtract(cardCutout())
)(cardOuter());

const part = () => _part.clone();

module.exports = {
  part
};
