const root = require("app-root-path");
const paper = require("paper-jsdom");

const path = require(`${root}/path`);
const group = require(`${root}/group`);
const { flipH } = require(`${root}/transform`);
const { cut, guide } = require(`${root}/stroke`);
const { engrave } = require(`${root}/fill`);
const { inches, mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const T = inches(1 / 8);

const pinR = inches(1 / 16) / 2;
const amiiboRadius = inches(1 + 1 / 8) / 2;
const outerRadius = amiiboRadius + T * 2;

const pin = deg =>
  path
    .circle({ radius: pinR })
    .translate(outerRadius, T)
    .rotate(deg, outerRadius);

const amiiboCutout = path
  .circle({ radius: amiiboRadius })
  .translate(outerRadius);

const outer = path.circle({ radius: outerRadius }).translate(outerRadius);

const label = new paper.PointText(outerRadius, outerRadius + 5);
label.fontFamily = "monospace";
label.fontSize = 15;
label.content = "DIABLO";
label.justification = "center";

const disc = outer
  .clone()
  .subtract(pin(0))
  .subtract(pin(90))
  .subtract(pin(180))
  .subtract(pin(270));

layoutRowsWithOffset(
  [
    [
      cut(disc.clone()),
      cut(disc.clone().subtract(amiiboCutout.clone())),
      group(cut(disc.clone()), engrave(flipH(label)))
    ]
  ],
  10
);
