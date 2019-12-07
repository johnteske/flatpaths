const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins, supports } = require("../constructs/card-outer");
const cardCutout = require("../constructs/card-cutout");

const cardOuterPart = pipe(
  ...pins().map(subtract),
  ...supports().map(subtract),
  subtract(cardCutout())
)(cardOuter());

module.exports = () => {
  return cardOuterPart.clone();
};
