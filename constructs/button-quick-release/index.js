const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);
const { flipH, flipV } = require(`${root}/transform`);

const construct = unit => {
  const halfUnit = unit / 2;

  const geometry = {
    width: unit * 10
  };

  const _slip = new paper.Path(
    [0, 0],
    [unit, unit],
    [0, unit],
    [0, 0]
  ).translate(unit, 0);

  const _a = pipe(
    // latch
    unite(_slip.clone()),
    // arm
    unite(
      path.rect({
        width: -halfUnit + unit * 8,
        height: unit,
        x: halfUnit,
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

  const support = path.rect({
    width: unit,
    height: unit * 2,
    x: unit * 3
  });

  const _b = pipe(
    unite(_slip.clone()),
    flipH,
    flipV,
    unite(support.clone())
  )(
    path.rect({
      width: unit,
      height: unit * 3
    })
  );

  const hole = path.circle({
    radius: mm(3) / 2
  });

  const holePositions = [
    [halfUnit, halfUnit],
    [halfUnit, -halfUnit + unit * 5], // _outer.height - 1/2u
    [-halfUnit + geometry.width, halfUnit], // _outer.width - 1/2u
    [-halfUnit + geometry.width, -halfUnit + unit * 5],
    [halfUnit + unit * 6, halfUnit + unit * 2]
  ];
  const holePattern = holePositions.map(point => hole.clone().translate(point));

  const _outer = pipe(...holePattern.map(subtract))(
    path.rect({
      width: geometry.width,
      height: unit * 5,
      radius: unit * 0.5
    })
  );

  const _inner = pipe(
    // space for hook (part b)
    subtract(
      path.rect({
        width: unit * 2,
        height: unit * 3,
        x: unit * 4
      })
    ),
    // space for support
    subtract(support.clone().translate(unit * 4, 0)),
    // space for latch (part a)
    subtract(
      path.rect({
        width: unit * 3,
        height: unit * 3,
        x: unit,
        y: unit
      })
    ),
    // space for button/latch arm
    subtract(
      path.rect({
        width: geometry.width - unit,
        height: unit,
        x: unit,
        y: unit * 3
      })
    )
  )(_outer.clone());

  const fill = color => o => {
    // o.fillColor = color;
    // o.opacity = 0.5; // TODO
    return o;
  };

  const guides = () =>
    group(
      fill("#ff0000")(_a.clone().translate(unit * 3, unit)),
      fill("#0000ff")(_b.clone().translate(unit * 4, 0)),
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
