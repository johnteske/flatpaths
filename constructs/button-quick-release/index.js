const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { inches, mm } = require(`${root}/units`);
const { flipH } = require(`${root}/transform`);

const construct = unit => {
  const _a = pipe(
    // latch
    unite(
      new paper.Path([0, 0], [unit, unit], [0, unit], [0, 0]).translate(unit, 0)
    ),
    // arm
    unite(
      path.rect({
        width: unit * 5.5,
        height: unit,
        x: unit * 0.5,
        y: unit * 2,
        radius: mm(0.5)
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

  const hole = path.circle({
    radius: inches(3 / 32) / 2
  });
  const halfUnit = unit / 2;
  const holePositions = [
    [halfUnit, halfUnit],
    [halfUnit, -halfUnit + unit * 5], // _outer.height - 1/2u
    [-halfUnit + unit * 7, halfUnit], // _outer.width - 1/2u
    [-halfUnit + unit * 7, -halfUnit + unit * 5],
    [halfUnit + unit * 5, halfUnit + unit * 2]
  ];
  const holePattern = holePositions.map(point => hole.clone().translate(point));

  const _outer = pipe(...holePattern.map(subtract))(
    path.rect({
      width: unit * 7,
      height: unit * 5,
      radius: unit * 0.5
    })
  );

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
