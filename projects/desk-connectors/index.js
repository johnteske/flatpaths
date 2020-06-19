const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const UNIT = inches(1 + 9 / 16);
const T = inches(1 / 4);
const LAYERS = 3;

const centerOfUnit = UNIT / 2;

const hole = () =>
  path.rect({
    width: T,
    height: T
  });

const layer = () =>
  path
    .rect({
      width: UNIT,
      height: UNIT * 2
    })
    .subtract(hole().translate(centerOfUnit - T / 2))
    .subtract(
      hole().translate(centerOfUnit - T / 2, UNIT * 2 - centerOfUnit - T / 2)
    );

const pin = () =>
  path.rect({
    width: T,
    height: LAYERS * T
  });

layoutRowsWithOffset(
  [[layer(), layer(), layer()].map(cut), [pin(), pin()].map(cut)],
  T
);
