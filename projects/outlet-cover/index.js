const root = require("app-root-path");
const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);
const { cut, guide } = require(`${root}/stroke`);

// https://www.mcmaster.com/7533K82/
const cover = {
  width: inches(2 + 15 / 16),
  height: inches(4 + 11 / 16)
};
const toggle = {
  width: inches(1 + 5 / 16),
  height: inches(2 + 5 / 8)
};
toggle.x = toggle.width / -2;
toggle.y = toggle.height / -2;

const hole = {
  radius: inches(3 / 16) / 2,
  x: cover.width / 2,
  y: cover.height / 2,
  dy: inches(3 + 13 / 16) / 2
};

module.exports = function generate() {
  cut(
    path
      .rect({ ...cover, radius: inches(1 / 16) })
      .subtract(
        path.rect({ ...toggle }).translate(cover.width / 2, cover.height / 2)
      )
      .subtract(path.circle(hole).translate(0, hole.dy))
      .subtract(path.circle(hole).translate(0, -hole.dy))
  );
};
