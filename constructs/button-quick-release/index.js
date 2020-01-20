const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { flipH } = require(`${root}/transform`);

const construct = unit => {
  const _a = pipe(
    // latch
    unite(
      path.rect({
        width: unit * 2, // TODO take out notch
        height: unit
      })
    ),
    // arm
    unite(
      path.rect({
        width: unit * 5.5,
        height: unit,
        x: unit * 0.5,
        y: unit * 2,
        radius: unit * 0.5
      })
    )
  )(
    // vertical
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

  const _outer = path.rect({
    width: unit * 7,
    height: unit * 5,
    radius: unit * 0.5
  });

  const _inner = pipe(
    // space for hook
    subtract(
      path.rect({
        width: unit * 2,
        height: unit * 3,
        x: unit * 3
      })
    ),
    // space for latch
    subtract(
      path.rect({
        width: unit * 2,
        height: unit * 3,
        x: unit,
        y: unit
      })
    ),
    // space for button/latch arm
    subtract(
      path.rect({
        width: unit * 6,
        height: unit,
        x: unit,
        y: unit * 3
      })
    )
  )(_outer.clone());

  const fill = color => o => {
    o.fillColor = color;
    o.opacity = 0.5; // TODO
    return o;
  };

  const guides = () =>
    group(
      fill("#ff0000")(_a.clone().translate(unit * 2, unit)),
      fill("#0000ff")(_b.clone().translate(unit * 3, 0)),
      fill("#00ffff")(_inner.clone()),
      fill("#00ff00")(_outer.clone())
    );

  return {
    a: () => _a.clone(),
    b: () => _b.clone(),
    inner: () => _inner.clone(),
    outer: () => _outer.clone(),
    guides
  };
};

module.exports = construct;
