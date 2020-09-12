// v2
// - add a framing layer cover sits flush with wall
// - replace layer/pin walls with a single piece, bent at 90 degrees
const root = require("app-root-path");
const paper = require("paper-jsdom");
const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);
const { cut, guide, score } = require(`${root}/stroke`);
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

// #6-32, 5/16" length minimum
const hole = {
  radius: inches(3 / 16) / 2,
  x: cover.width / 2,
  y: cover.height / 2,
  dy: inches(3 + 13 / 16) / 2
};

const cableBack = {
  width: inches(5 / 16) * 5, // toggle.width,
  height: inches(5 / 16) * 6, // inches(1 + 1/2),
  radius: inches(1 / 16)
};
cableBack._x = (cover.width - cableBack.width) / 2;
cableBack._y = cover.height;

// https://www.mcmaster.com/98296A019/
// 1/16"D x  1/4"L
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
      .translate(inches(5 / 16), cableBack.height - cableChannel.bounds.height)
  )
  .subtract(
    cableChannel
      .clone()
      .translate(
        inches(5 / 16) * 3,
        cableBack.height - cableChannel.bounds.height
      )
  );

const makeMapTranslate = item => point => item.clone().translate(point);

const screwHoles = () =>
  [[0, hole.dy], [0, -hole.dy]].map(makeMapTranslate(path.circle(hole)));

const pinHoles = () =>
  [
    [framePinOffset, framePinOffset],
    [cover.width - framePinOffset, framePinOffset],
    [framePinOffset, cover.height / 2],
    [cover.width - framePinOffset, cover.height / 2],
    [framePinOffset, cover.height - framePinOffset],
    [cover.width - framePinOffset, cover.height - framePinOffset]
  ].map(p => pinHole.clone().translate(p));

const outletCover = pipe(
  ...screwHoles().map(subtract),
  ...pinHoles().map(subtract)
)(
  path
    .rect(cover)
    .subtract(path.rect(toggle).translate(cover.width / 2, cover.height / 2))
    .unite(cableHook.clone().translate(cableBack._x, cableBack._y))
);

const skirtCutout = path
  .rect({ ...toggle, radius: 0 })
  .translate(cover.width / 2, 0);

const skirt = pipe(
  subtract(
    path
      .rect({
        width: cover.width - frameW * 2,
        height: cover.height - frameW * 2
      })
      .translate(frameW)
  ),
  subtract(
    skirtCutout
      .clone()
      .translate(0, toggle.height / 2 + hole.y - hole.dy - inches(1 / 4))
  ),
  subtract(
    skirtCutout
      .clone()
      .translate(
        0,
        cover.height - toggle.height / 2 - (hole.y - hole.dy) + inches(1 / 4)
      )
  ),
  ...screwHoles().map(subtract),
  ...pinHoles().map(subtract)
)(path.rect(cover));

const version = new paper.PointText();
version.fontSize = inches(1 / 2);
version.content = "v2";
version.fillColor = "#00ffff";
version.translate(0, inches(1 / 2)); // "top align"

module.exports = function generate() {
  layoutRowsWithOffset(
    [
      [
        group(
          cut(outletCover),
          score(
            new paper.Path([
              [cableBack._x, cableBack._y],
              [cableBack._x + cableBack.width, cableBack._y]
            ])
          )
        ),
        group(
          cut(skirt),
          ...screwHoles().map(guide),
          guide(
            skirtCutout
              .clone()
              .translate(
                0,
                cover.height -
                  toggle.height / 2 -
                  (hole.y - hole.dy) +
                  inches(1 / 4)
              )
          )
        )
      ],
      [cableHook.clone()].map(guide),
      [version]
    ],
    inches(1 / 2)
  );
};
