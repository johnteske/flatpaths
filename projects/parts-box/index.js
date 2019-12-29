// drawers stoppers
//
// parts drawers 1u, 2u, 3u, 4u
// - bottom with pull
// - sides
// - front
// - back
// - divider (1 or 2, optional)

const root = require("app-root-path");
const paper = require("paper-jsdom");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const { guide } = require(`${root}/stroke`);

const { T } = require("./material");
const body = require("./parts/body");

layoutRowsWithOffset(
  [
    body()
      .map(guide)
      .map(_ => {
        // TODO this is for better viewing during design
        _.strokeWidth = 4;
        return _;
      })
  ],
  T
);

paper.view.viewSize = [9999, 9999];
