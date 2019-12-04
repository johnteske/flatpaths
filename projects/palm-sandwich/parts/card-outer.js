const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins } = require("../constructs/card-outer");
const cardCutout = require("../constructs/card-cutout");
const { width } = require("../constructs/frame");

const cardOuterPart = pipe(
  ...pins().map(subtract),
  subtract(cardCutout().translate(width))
)(cardOuter());

module.exports = () => {
  return cardOuterPart.clone();
};
