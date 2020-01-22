const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const quickRelease = require(`${root}/constructs/button-quick-release`);

const qrUnit = mm(6);
const qr = quickRelease(qrUnit);

layoutRowsWithOffset(
  [
    [
      qr.outer(),
      qr.inner(),
      qr.a(),
      qr
        .b()
        .translate(0, qrUnit)
        .unite(path.rect({ width: 5 * qrUnit, height: qrUnit })),
      qr.outer()
    ].map(cut),
    [qr.guides(), qr.a(), qr.b(), qr.inner(), qr.outer()].map(guide)
  ],
  qrUnit
);
