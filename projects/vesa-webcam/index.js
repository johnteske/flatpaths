const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { fillColor } = require(`${root}/fill`);
const group = require(`${root}/group`);
const { translate } = require(`${root}/transform`);
const { inches, mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const T = mm(5); // inches(1/4)
const _mountPadding = inches(0.5);
const vesaHole = path.circle({
  radius: mm(2) // M4
});

const vesaMount = path.rect({
  width: _mountPadding + mm(100) + _mountPadding,
  height: _mountPadding * 2,
  radius: mm(2)
});
const mount = vesaMount
  .clone()
  .subtract(vesaHole.clone().translate(_mountPadding + mm(100), _mountPadding))
  .subtract(vesaHole.clone().translate(_mountPadding));
const attachmentPin = path.rect({
  width: mm(10),
  height: T * 3
});
const attachmentPinHole = path.rect({
  width: T,
  height: mm(10),
  x: mm(15) - T / 2,
  y: mm(10)
});
const attachmentPoint = path
  .rect({
    width: mm(30),
    height: mm(30),
    radius: mm(2)
  })
  .subtract(attachmentPinHole);
const cameraArm = path.rect({
  width: mm(30),
  height: mm(125),
  radius: mm(2)
});
const arm = cameraArm.clone().subtract(attachmentPinHole.clone());

// position
arm.translate(vesaMount.width / 2 - cameraArm.width / 2, 0);
mount.translate(0, cameraArm.height - vesaMount.height / 2);

layoutRowsWithOffset(
  [
    // stock
    [group(arm, mount), attachmentPin.clone(), attachmentPoint.clone()].map(
      guide
    ),
    // parts
    [
      arm.unite(mount.clone()),
      attachmentPin.clone(),
      attachmentPoint.clone(),
      attachmentPoint.clone()
    ].map(cut)
  ],
  T
);

paper.view.viewSize = [inches(72), inches(72)];
