const root = require("app-root-path");

const path = require(`${root}/path`);
const { subtract } = require(`${root}/boolean`);
const { mm } = require(`${root}/units`);
const { pipe } = require(`${root}/fn`);

const frame = require("../constructs/frame");
const {
  pins
} = require("../constructs/card-outer");

const tabSize = (frame.width + mm(1)) * 2;

const faceTopLeft = path.rect({
  width: tabSize,
  height: tabSize,
  radius: tabSize
});

const face = faceTopLeft;

const part = pipe(
  ...pins().map(subtract)
)(face);

module.exports = () => part.clone();
