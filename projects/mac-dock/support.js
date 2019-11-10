const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const { T } = require("./material");
const { tray, bottomGeometry } = require("./mac-tray");

const supportGeometry = {
  width: T * 2 + tray.width + T * 2,
  height: bottomGeometry.height
};

// TODO duplicated
const slotGeometry = {
  width: T,
  height: bottomGeometry.height / 2
};
//slotGeometry.y = bottomGeometry.height + bottomGeometry.y - slotGeometry.height;
const slot = path.rect(slotGeometry);

// TODO helper functions belong on own
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const subtract = cutout => target => target.subtract(cutout);
const x1 = mm(33) - slotGeometry.width / 2; // magSafe, center material
const x2 = mm(86) - slotGeometry.width / 2; // multiport, center material
const withSlots = pipe(
  subtract(slot.clone().translate([T, 0])),
  subtract(slot.clone().translate([T * 2 + x1, 0])),
  subtract(slot.clone().translate([T * 2 + x2, 0])),
  subtract(slot.clone().translate([supportGeometry.width - T * 2 - x2, 0])),
  subtract(slot.clone().translate([supportGeometry.width - T * 2 - x1, 0])),
  subtract(slot.clone().translate([supportGeometry.width - T * 2, 0]))
);

const support = withSlots(path.rect(supportGeometry));

module.exports = {
  supportGeometry,
  support: () => support.clone()
};
