const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins } = require("../constructs/card-outer");
const palmCutout = require("../constructs/palm-cutout");
const { width } = require("../constructs/frame");

const part = pipe(
  ...pins().map(subtract),
  subtract(palmCutout().translate([0, width]))
)(cardOuter());

module.exports = () => {
  return part.clone();
};
