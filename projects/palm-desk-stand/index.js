const root = require("app-root-path");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const path = require(`${root}/path`);
const group = require(`${root}/group`);
const palm = require(`${root}/objects/palm`);
const { cut, guide } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);

const T = require("./material");
const T2 = inches(3 / 4);
const theta = 105; // or 150
const corners = 0; // T / 2

const phone = {
  width: palm.w,
  height: palm.h
};

// TODO calculate based on lever physics for balanace
const slotWidth = inches(4);

const _fork = path
  .rect({
    width: slotWidth + T2,
    height: T2 + T2 + T2,
    radius: corners
  })
  .subtract(
    path.rect({
      width: slotWidth,
      height: T2,
      y: T2
    })
  );
const _forkTransform = _ => _.translate(0, phone.height);

const _pin = path.rect({
  width: T,
  height: T2
});

const _back = path
  .rect({
    width: T2,
    height: phone.height,
    radius: corners
  })
  .subtract(_pin.clone().translate((T2 - T) / 2, T2))
  .subtract(_pin.clone().translate((T2 - T) / 2, phone.height - T2 - T2));
const _backTransform = _ =>
  _.rotate(theta - 90, [0, phone.height]).translate(slotWidth, 0);

const side = _forkTransform(_fork.clone()).unite(_backTransform(_back.clone()));

const guides = [_fork.clone(), _back.clone()];

const placed = [
  group(_forkTransform(_fork.clone()), _backTransform(_back.clone()))
];

const cuts = [side.clone()];

layoutRowsWithOffset([cuts.map(cut), placed.map(guide), guides.map(guide)], T2);
