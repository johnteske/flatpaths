const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const quickRelease = require(`${root}/constructs/button-quick-release`);

const { pinGeometry } = require("./pin");

// use a consistent size to keep connectors between iterations
const unit = mm(6);
const qr = quickRelease(unit);

const keyringAttachment = {
  x: unit * 5,
  y: unit * 6
};

const withAttachmentPoint = o =>
  o
    .unite(path.rect({ width: unit * 2, height: unit, x: keyringAttachment.x - unit, y: keyringAttachment.y - unit }))
    .unite(path.circle({ ...keyringAttachment, radius: unit }))
    .subtract(path.circle({ ...keyringAttachment, radius: pinGeometry.r }));

module.exports = {
  ...qr,
  outer: () => qr.outer(),
  inner: () => withAttachmentPoint(qr.inner())
};
