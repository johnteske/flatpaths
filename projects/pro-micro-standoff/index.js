const root = require("app-root-path");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const group = require(`${root}/group`);
const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { cut, guide } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const path = require(`${root}/path`);

const pitch = inches(0.1);
const pinHoleDiameter = inches(0.04);

const rowDistance = pitch * 6;

const pinHole = path.circle({
  radius: pinHoleDiameter / 2
});

const row = () =>
  Array.from({ length: 12 }).map((v, i) =>
    pinHole.clone().translate([i * pitch, 0])
  );

const bottomRow = () => row().map(p => p.translate([0, rowDistance]));

const support = () =>
  path.rect({
    y: -pitch / 2,
    width: 11 * pitch,
    height: pitch
  });

layoutRowsWithOffset(
  [
    [group(support(), ...row(), ...bottomRow())].map(guide),
    [
      pipe(
        ...row().map(subtract),
        ...bottomRow().map(subtract)
      )(support())
    ].map(cut)
  ],
  10
);
