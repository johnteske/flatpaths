const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
const { unite } = require(`${root}/boolean`);
const { mm } = require(`${root}/units`);

const unit = mm(6);
const units = n => n * unit;

const geometry = {
  width: units(7),
  height: units(4)
};

const inner = pipe(
  // left
  unite(
    path.rect({
      width: unit,
      height: geometry.height
    })
  ),
  // right
  unite(
    path.rect({
      width: unit,
      height: geometry.height,
      x: units(6)
    })
  ),

  // support under right piece
  unite(
    path.rect({
      width: unit,
      height: unit,
      x: units(5),
      y: units(2)
    })
  )
)(
  // bottom, will need to make space for charger
  path.rect({
    width: geometry.width,
    height: unit,
    y: units(3)
  })
);

const outer = path.rect(geometry);

module.exports = {
  inner: () => {
    return inner.clone();
  },
  outer: () => {
    return outer.clone();
  }
};
