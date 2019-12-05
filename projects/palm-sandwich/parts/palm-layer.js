const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins } = require("../constructs/card-outer");
const { button } = require("../constructs/button");
const palmCutout = require("../constructs/palm-cutout");

const part = pipe(
  ...pins().map(subtract),
  subtract(palmCutout()),
  subtract(button())
)(cardOuter());

module.exports = () => {
  return part.clone();
};
