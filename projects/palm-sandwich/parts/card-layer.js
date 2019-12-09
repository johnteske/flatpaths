const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins, supports } = require("../constructs/card-outer");
const cardCutout = require("../constructs/card-cutout");
const { cardOuterGeometry } = require("../constructs/card-outer");

const _part = pipe(
  ...pins().map(subtract),
  ...supports().map(subtract),
  subtract(cardCutout())
)(cardOuter());

const part = () => _part.clone();

const mask = () =>
  path.rect({
    width: cardOuterGeometry.width / 2,
    height: cardOuterGeometry.height
  });

const a = () =>
  part().subtract(mask().translate([cardOuterGeometry.width / 2, 0]));
const b = () =>
  part()
    .subtract(mask())
    .translate([-cardOuterGeometry.width / 2, 0]);

module.exports = {
  components: () => [a(), b()],
  part
};
