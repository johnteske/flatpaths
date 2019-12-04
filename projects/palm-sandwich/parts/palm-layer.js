const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const palm = require(`${root}/objects/palm`);

const {
  cardOuter,
  cardOuterGeometry,
  pins
} = require("../constructs/card-outer");
const palmCutout = require("../constructs/palm-cutout");
const { width } = require("../constructs/frame");

const part = pipe(
  ...pins().map(subtract),
  subtract(
    palmCutout().translate([(cardOuterGeometry.width - palm.w) / 2, width])
  )
)(cardOuter());

module.exports = () => {
  return part.clone();
};
