const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { flipH } = require(`${root}/transform`);

const construct = unit => {
  const _a = pipe(
    unite(
      path.rect({
        width: unit * 2, // TODO take out notch
        height: unit
      })
    ),
    unite(
      path.rect({
        width: unit * 3,
        height: unit,
        y: unit * 2
      })
    )
  )(
    path.rect({
      width: unit,
      height: unit * 3
    })
  );

  const _b = pipe(
    unite(
      path.rect({
        width: unit * 2,
        height: unit,
        y: unit * 2
      })
    ),
    flipH
  )(
    path.rect({
      width: unit,
      height: unit * 3
    })
  );

  const guides = () => group(_a.clone(), _b.clone().translate(unit, -unit));

  return {
    a: () => _a.clone(),
    b: () => _b.clone(),
    guides
  };
};

module.exports = construct;
