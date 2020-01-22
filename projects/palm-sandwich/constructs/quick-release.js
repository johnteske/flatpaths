const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const T = require("../material");

const quickRelease = require(`${root}/constructs/button-quick-release`);

// use a consistent size to keep connectors between iterations
const unit = mm(6);
const qr = quickRelease(unit);

const keyringAttachment = {
  x: unit * 5,
  y: unit * 5
};

const withKeyringAttachment = o =>
  o
    .unite(path.circle({ ...keyringAttachment, radius: unit }))
    .subtract(path.circle({ ...keyringAttachment, radius: mm(3) / 2 }));

module.exports = {
  ...qr,
  outer: () => qr.outer(),
  inner: () => withKeyringAttachment(qr.inner())
};
