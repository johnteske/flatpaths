const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

layoutRowsWithOffset(
  [
    [
      // 2x4 ft
      path.rect({
        width: inches(24),
        height: inches(48)
      }),
      // 2x2 ft
      path.rect({
        width: inches(24),
        height: inches(24)
      })
    ].map(cut)
    //].map(guide)
  ],
  inches(3 / 4)
);

paper.view.viewSize = [inches(72), inches(72)];
paper.view.scale(1 / 16, [0, 0]);
