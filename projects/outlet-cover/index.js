const root = require("app-root-path");
const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);
const { cut } = require(`${root}/stroke`);
const group = require(`${root}/group`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const radius = inches(1 / 16);

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
  height: inches(1 / 2),
  radius: inches(1 / 16)
};
cableBack._x = (cover.width - cableBack.width) / 2;
cableBack._y = cover.height + inches(1);
const pinRadius = inches(1 / 16) / 2;
const pinOffset = inches(1 / 8);

const cableWall = {
  width: pinOffset * 2,
  height: cableBack.height,
  radius
};
const wall = path
  .rect(cableWall)
  .subtract(path.circle({ radius: pinRadius }).translate(pinOffset))
  .subtract(
    path
      .circle({ radius: pinRadius })
      .translate(pinOffset, cableWall.height - pinOffset)
  );

const cableHook = path
  .rect(cableBack)
  // fill in connecting corners
  .unite(
    path
      .rect({
        ...cableBack,
        radius: 0,
        height: inches(1) + cableBack.height / 2
      })
      .translate(0, inches(-1))
  )
  // left
  .subtract(path.circle({ radius: pinRadius }).translate(pinOffset, pinOffset))
  .subtract(
    path
      .circle({ radius: pinRadius })
      .translate(pinOffset, cableBack.height - pinOffset)
  )
  // center
  .subtract(
    path.circle({ radius: pinRadius }).translate(cableBack.width / 2, pinOffset)
  )
  .subtract(
    path
      .circle({ radius: pinRadius })
      .translate(cableBack.width / 2, cableBack.height - pinOffset)
  )
  // right
  .subtract(
    path
      .circle({ radius: pinRadius })
      .translate(cableBack.width - pinOffset, pinOffset)
  )
  .subtract(
    path
      .circle({ radius: pinRadius })
      .translate(cableBack.width - pinOffset, cableBack.height - pinOffset)
  );

module.exports = function generate() {
  layoutRowsWithOffset(
    [
      [
        cut(
          // outlet cover
          path
            .rect(cover)
            .subtract(
              path.rect(toggle).translate(cover.width / 2, cover.height / 2)
            )
            .subtract(path.circle(hole).translate(0, hole.dy))
            .subtract(path.circle(hole).translate(0, -hole.dy))
            // ethernet cable hooks
            .unite(cableHook.clone().translate(cableBack._x, cableBack._y))
        )
      ],
      [wall.clone(), wall.clone(), wall.clone()].map(cut)
    ],
    10
  );
};
