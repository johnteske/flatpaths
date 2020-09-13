const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const group = require(`${root}/group`);
const { inches, mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const T = mm(3);

// door viewer
const d = mm(12);
const r = d / 2;

const cutout = path.circle({
  radius: r,
  x: 2 * T + r,
  y: 2 * T + r
});

const pinCutout = path.circle({ radius: inches(1 / 16) / 2 });
const pins = {
  x1: T,
  x2: 3 * T + d,
  y1: T,
  y2: 3 * T + d
};

const _outer = path
  .rect({
    size: d + 4 * T,
    radius: inches(1 / 16)
  })
  .subtract(pinCutout.clone().translate(pins.x1, pins.y1))
  .subtract(pinCutout.clone().translate(pins.x2, pins.y1))
  .subtract(pinCutout.clone().translate(pins.x1, pins.y2))
  .subtract(pinCutout.clone().translate(pins.x2, pins.y2));

const base = _outer.clone().subtract(cutout.clone());
const layer2 = _outer
  .clone()
  .subtract(path.circle({ radius: mm(15 / 2), x: 2 * T + r, y: 2 * T + r }));
const inner = _outer
  .clone()
  .subtract(path.rect({ width: d, height: 2 * T + d }).translate(2 * T, 0));
const cover = path
  .rect({ width: d + 4 * T, height: 2 * T, radius: inches(1 / 16) })
  .unite(path.rect({ width: d, height: 2 * T + d }).translate(2 * T));
const outer = _outer.clone().subtract(path.rect({ size: d }).translate(2 * T));

layoutRowsWithOffset(
  [
    // guide
    [
      group(
        cutout.clone(),
        base.clone(),
        layer2.clone(),
        inner.clone(),
        outer.clone()
      )
    ].map(guide),
    // parts
    [
      base.clone(),
      layer2.clone(),
      inner.clone(),
      cover.clone(),
      outer.clone()
    ].map(cut)
  ],
  d
);
