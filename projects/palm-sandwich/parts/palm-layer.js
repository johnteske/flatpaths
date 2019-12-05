const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins } = require("../constructs/card-outer");
const { buttonTranslated } = require("../constructs/button");
const palmCutout = require("../constructs/palm-cutout");

const part = pipe(
  ...pins().map(subtract),
  subtract(palmCutout()),
  subtract(buttonTranslated())
)(cardOuter());

module.exports = () => {
  return part.clone();
};
