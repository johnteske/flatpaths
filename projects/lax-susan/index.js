const root = require("app-root-path");
const paper = require("paper-jsdom");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const { cut } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);
const path = require(`${root}/path`);

const topBase = require("./parts/top-base");
const ring = require("./parts/top-ring");

const r = inches(5);
const T = mm(3.3);

layoutRowsWithOffset(
  [
    // top base
    [topBase()].map(cut),

    // top support
    [ring()].map(cut),

    // bottom base
    [
      path.rect({
        width: inches(11),
        height: inches(11),
        radius: inches(0.25)
      })
    ].map(cut)
  ],
  T
);

paper.view.viewSize = [9999, 9999];
