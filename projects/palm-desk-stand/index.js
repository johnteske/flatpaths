const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const quickRelease = require("../palm-sandwich/constructs/quick-release");

const unit = mm(6);
const T = require("./material");

const guides = [
  // quick release, for reference
  quickRelease.b(),
  quickRelease.inner()
];

const cuts = [
  // left
  path
    .rect({
      width: unit,
      height: unit * 4
    })
    .unite(
      // right
      path.rect({
        width: unit,
        height: unit * 4,
        x: unit * 6
      })
    )
    .unite(
      // support under right piece
      path.rect({
        width: unit,
        height: unit,
        x: unit * 5,
        y: unit * 2
      })
    )
    .unite(
      // bottom, will need to make space for charger
      path.rect({
        width: unit * 7,
        height: unit,
        y: unit * 3
      })
    )
];

layoutRowsWithOffset([cuts.map(cut), guides.map(guide)], T);
