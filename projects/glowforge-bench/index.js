const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { fillColor } = require(`${root}/fill`);
const group = require(`${root}/group`);
const { translate } = require(`${root}/transform`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const kerf = inches(1 / 2); // TODO need to calculate
const sawCut = length =>
  path.rect({
    height: kerf,
    width: length
  });

layoutRowsWithOffset(
  [
    // stock
    [
      // 2x4 ft
      group(
        path.rect({
          width: inches(24),
          height: inches(48)
        }),
        // example part to be cut
        fillColor("#888888aa")(
          path.rect({
            width: inches(24),
            height: inches(24)
          })
        ),
        translate(0, inches(24))(sawCut(inches(24)))
      ),
      // 2x2 ft
      path.rect({
        width: inches(24),
        height: inches(24)
      })
    ].map(guide),
    // parts
    [
      // shelf inner (1 each self unit)
      path.rect({
        width: inches(12),
        height: inches(12)
      }),
      // shelf sides (6 each shelf unit)
      path.rect({
        width: inches(12),
        height: inches(18)
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
