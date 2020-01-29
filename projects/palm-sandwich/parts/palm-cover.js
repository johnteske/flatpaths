const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut } = require(`${root}/stroke`);
const { engrave } = require(`${root}/fill`);
const group = require(`${root}/group`);
const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const palm = require(`${root}/objects/palm`);

const frame = require("../constructs/frame");
const {
  cardOuterGeometry,
  pins,
  pinPoints,
  supportHoles
} = require("../constructs/card-outer");
const { pinGeometry } = require("../constructs/pin");

const tabSize = frame.width + Math.min(palm.face.y, palm.face.y2);

const faceTopLeft = path.rect({
  width: tabSize,
  height: tabSize,
  radius: cardOuterGeometry.radius
});

const face = faceTopLeft;

const part = group(
  cut(
    pipe(
      ...pins().map(subtract),
      ...supportHoles().map(subtract)
    )(face)
  ),
  engrave(path.circle({ radius: pinGeometry.head.r }).translate(pinPoints[0]))
);

module.exports = () => part.clone();
