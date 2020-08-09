// v2
// - add a framing layer cover sits flush with wall
// - replace layer/pin walls with a single piece, bent at 90 degrees
// TODO mark bend position
// TODO align cable channels
// TODO make current layer bottom layer
// TODO make top/vanity layer
const root = require("app-root-path");
const paper = require("paper-jsdom");
const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);
const { cut } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const T = inches(1 / 8);
const radius = inches(1 / 16);
const frameW = T * 3;

// https://www.mcmaster.com/7533K82/
const cover = {
  width: inches(2 + 15 / 16),
  height: inches(4 + 11 / 16),
  radius
};
const toggle = {
  width: inches(1 + 5 / 16),
  height: inches(2 + 5 / 8),
  radius
};
toggle.x = toggle.width / -2;
toggle.y = toggle.height / -2;
const hole = {
  radius: inches(3 / 16) / 2,
  x: cover.width / 2,
  y: cover.height / 2,
  dy: inches(3 + 13 / 16) / 2
};

const cableBack = {
  width: toggle.width,
  height: inches(1),
  radius: inches(1 / 16)
};
cableBack._x = (cover.width - cableBack.width) / 2;
cableBack._y = cover.height;
const pinRadius = inches(1 / 16) / 2;
const pinHole = path.circle({ radius: pinRadius });
const framePinOffset = frameW / 2;

const cableChannel = path.rect({
  width: inches(5 / 16), // TODO approx cat5 diameter?
  height: inches(5 / 16) * 3
});

const cableHook = path
  .rect(cableBack)
  // fill in connecting corners
  .unite(
    path
      .rect({
        ...cableBack,
        radius: 0,
        height: radius + cableBack.height / 2
      })
      .translate(0, -radius)
  )
  // TODO cable cutouts
  .subtract(
    cableChannel
      .clone()
      .translate(inches(0.123), cableBack.height - cableChannel.bounds.height)
  )
  .subtract(
    cableChannel
      .clone()
      .translate(inches(0.666), cableBack.height - cableChannel.bounds.height)
  );

const outletCover = path
  .rect(cover)
  .subtract(path.rect(toggle).translate(cover.width / 2, cover.height / 2))
  // screw holes
  .subtract(path.circle(hole).translate(0, hole.dy))
  .subtract(path.circle(hole).translate(0, -hole.dy))
  // pin holes
  .subtract(pinHole.clone().translate(framePinOffset))
  .subtract(
    pinHole.clone().translate(cover.width - framePinOffset, framePinOffset)
  )
  .subtract(
    pinHole.clone().translate(framePinOffset, cover.height - framePinOffset)
  )
  .subtract(
    pinHole
      .clone()
      .translate(cover.width, cover.height)
      .translate(-framePinOffset)
  )
  // ethernet cable hooks
  .unite(cableHook.clone().translate(cableBack._x, cableBack._y));

const version = new paper.PointText();
version.fontSize = inches(1 / 2);
version.content = "v2";
version.fillColor = "#00ffff";
version.translate(0, inches(1 / 2)); // "top align"

module.exports = function generate() {
  layoutRowsWithOffset([[cut(outletCover)], [version]], 10);
};
