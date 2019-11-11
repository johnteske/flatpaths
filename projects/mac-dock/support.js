const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
const { subtract } = require(`${root}/boolean`);
const { mm } = require(`${root}/units`);

const { T } = require("./material");
const { tray, bottom: bottomGeometry } = require("./tray");
const { slotGeometry, slot } = require("./slot");

const supportGeometry = {
  width: T * 2 + tray.depth + T * 2,
  height: bottomGeometry.height
};

const x1 = mm(33) - slotGeometry.width / 2; // magSafe, center material
const x2 = mm(86) - slotGeometry.width / 2; // multiport, center material

const slotPoints = [
  [T, 0],
  [T * 2 + x1, 0],
  [T * 2 + x2, 0],
  [supportGeometry.width - T * 2 - x2, 0],
  [supportGeometry.width - T * 2 - x1, 0],
  [supportGeometry.width - T * 2, 0]
];

const slots = slotPoints.map(point => slot.clone().translate(point));

const withSlots = pipe(...slots.map(s => subtract(s)));

const support = withSlots(path.rect(supportGeometry));

module.exports = {
  supportGeometry,
  support: () => support.clone()
};
