const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const group = require(`${root}/group`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { inches, mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const T = mm(3);
const _mountPadding = inches(5 / 16);
const vesaHole = path.circle({
  radius: mm(4) / 2 // M4
});

const vesaMount = {
  width: _mountPadding + mm(100) + _mountPadding,
  height: _mountPadding * 2
};
vesaMount.part = path.rect(vesaMount);

const topMount = () =>
  vesaMount.part
    .clone()
    .subtract(
      vesaHole.clone().translate(_mountPadding + mm(100), _mountPadding)
    )
    .subtract(vesaHole.clone().translate(_mountPadding));

const leftMount = () =>
  topMount()
    .rotate(90, [0, 0])
    .translate(vesaMount.height, 0);
const rightMount = () =>
  leftMount().translate(vesaMount.width - vesaMount.height, 0);

const mountPart = () =>
  pipe(
    //unite(leftMount()),
    unite(rightMount())
  )(leftMount());

const powerBrick = {
  width: inches(5),
  height: inches(2)
};
const powerBrickSupport = {
  width: _mountPadding + powerBrick.width + _mountPadding,
  height: _mountPadding + powerBrick.height + _mountPadding,
  radius: mm(4) / 2
};
const pbCutout = () =>
  path.rect({
    width: mm(8),
    height: mm(4),
    radius: mm(4) / 2
  });
const pbCutoutGeo = {
  x: _mountPadding * 2
};
pbCutoutGeo.width = powerBrickSupport.width - pbCutoutGeo.x * 2;
// TODO clean up points
//const pbCutoutPoints =  [[]]
const arm = {
  width: vesaMount.width,
  height:
    inches(1 + 1 / 4) -
    _mountPadding +
    (inches(5) - powerBrickSupport.height) / 2
};
console.log(
  arm.height + powerBrickSupport.height / 2,
  (arm.height + powerBrickSupport.height / 2) / 96
);
powerBrickSupport.part = () =>
  pipe(
    // arm
    unite(
      path.rect(arm).translate(
        (powerBrickSupport.width - vesaMount.width) / 2,

        powerBrickSupport.height
      )
    ),
    // top
    subtract(
      pbCutout().translate(
        pbCutoutGeo.width * (1 / 4) - mm(4) + _mountPadding * 2,
        -mm(2)
      )
    ),
    subtract(
      pbCutout().translate(
        pbCutoutGeo.width * (3 / 4) - mm(4) + _mountPadding * 2,
        -mm(2)
      )
    ),
    // bottom
    subtract(
      pbCutout().translate(
        pbCutoutGeo.width * (1 / 4) - mm(4) + _mountPadding * 2,
        powerBrickSupport.height - mm(2)
      )
    ),
    subtract(
      pbCutout().translate(
        pbCutoutGeo.width * (3 / 4) - mm(4) + _mountPadding * 2,
        powerBrickSupport.height - mm(2)
      )
    ),
    // stress relief
    subtract(
      vesaHole
        .clone()
        .translate(
          (powerBrickSupport.width - vesaMount.width) / 2,
          powerBrickSupport.height
        )
    ),
    subtract(
      vesaHole
        .clone()
        .translate(
          powerBrickSupport.width -
            (powerBrickSupport.width - vesaMount.width) / 2,
          powerBrickSupport.height
        )
    )
  )(path.rect(powerBrickSupport));

layoutRowsWithOffset(
  [
    [
      group(leftMount(), rightMount()),
      group(
        powerBrickSupport.part(),
        path.rect(powerBrick).translate(_mountPadding)
      )
    ].map(guide),
    [
      powerBrickSupport
        .part()
        .unite(
          mountPart().translate(
            (powerBrickSupport.width - vesaMount.width) / 2,
            powerBrickSupport.height + arm.height
          )
        )
    ].map(cut)
  ],
  T
);

paper.view.viewSize = [inches(72), inches(72)];
