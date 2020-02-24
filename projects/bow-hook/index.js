const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const quickRelease = require(`${root}/constructs/button-quick-release`);

const qrUnit = mm(6);
const qr = quickRelease(qrUnit);

const height = qrUnit * 4;

// Grainger 5MA89 binding post
const d = inches(13 / 64); // barrell diameter

layoutRowsWithOffset(
  [
    [
      qr
        .b()
        .translate(0, height)
        .unite(path.rect({ width: 4 * qrUnit, height, x: qrUnit }))
        .subtract(
          path.circle({
            radius: d / 2,
            x: 3 * qrUnit,
            y: qrUnit
          })
        )
        .subtract(
          path.circle({
            radius: d / 2,
            x: 3 * qrUnit,
            y: 3 * qrUnit
          })
        )
    ].map(cut)
  ],
  qrUnit
);
