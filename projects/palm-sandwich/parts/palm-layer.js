const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins } = require("../constructs/card-outer");
const palmCutout = require("../constructs/palm-cutout");

const part = pipe(
  ...pins().map(subtract),
  subtract(palmCutout())
)(cardOuter());

module.exports = () => {
  return part.clone();
};
