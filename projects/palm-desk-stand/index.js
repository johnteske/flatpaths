const root = require("app-root-path");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const path = require(`${root}/path`);
const group = require(`${root}/group`);
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

const T = require("./material");
const T2 = inches(3 / 4);
const theta = 105; // or 150

const phone = {
  width: mm(100), // TODO
  height: mm(100) // TODO
};

const _fork = path
  .rect({
    width: inches(4) + T2 * 3,
    height: T2 + T2 + T2
  })
  .subtract(
    path.rect({
      width: inches(4),
      height: T2,
      y: T2
    })
  );
const _forkTransform = _ => _.translate(0, phone.height);

const _back = path.rect({
  width: T2 * 3,
  height: phone.height
});
const _backTransform = _ =>
  _.rotate(theta - 90, [0, phone.height]).translate(inches(4), 0);

const side = _forkTransform(_fork.clone()).unite(_backTransform(_back.clone()));

const guides = [_fork.clone(), _back.clone()];

const placed = [
  group(_forkTransform(_fork.clone()), _backTransform(_back.clone()))
];

const cuts = [side.clone()];

layoutRowsWithOffset([cuts.map(cut), placed.map(guide), guides.map(guide)], T2);
