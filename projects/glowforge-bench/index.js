const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

layoutRowsWithOffset(
  [
    // stock
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
    ].map(cut),
    //].map(guide)
    // parts
    [
      // shelf sides and inner (5 each shelf unit)
      path.rect({
        width: inches(12),
        height: inches(12)
      }),
      // shelf back (1 each shelf unit)
      path.rect({
        width: inches(12),
        height: inches(24) // TODO this will be too short, given the height added by the playwood connector gaps on the sides
      }),
      // bench top
      path.rect({
        width: inches(36),
        height: inches(24)
      })
    ].map(cut)
  ],
  inches(3 / 4)
);

paper.view.viewSize = [inches(72), inches(72)];
paper.view.scale(1 / 16, [0, 0]);
