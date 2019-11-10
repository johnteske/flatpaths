const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const { T } = require("./material");

const tray = {
  width: mm(275), // leave room for hand
  //width: mm(349.3), // real measurement
  height: mm(15.5),
  depth: mm(240.7) + mm(1.3) // use for supporting struts, with wiggle room
};

const backGeometry = {
  width: mm(12.95) + mm(3), // TODO multiport + T
  height: mm(39.25), // TODO multiport + T
  x: tray.width
};

const back = path.rect(backGeometry);

const cableCenter = [mm(7.45), backGeometry.height - mm(7.25)];

const bottomGeometry = {
  width: tray.width + backGeometry.width,
  height: mm(24.75), // TODO multiport + T
  y: backGeometry.height
};

// TODO this belongs on its own
const slotGeometry = {
  width: T,
  height: bottomGeometry.height / 2
};
slotGeometry.y = bottomGeometry.height + bottomGeometry.y - slotGeometry.height;
const slot = path.rect(slotGeometry);

// TODO helper functions belong on own
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const subtract = cutout => target => target.subtract(cutout);
const withSlots = pipe(
  subtract(slot.clone().translate([T * 2, 0])),
  subtract(slot.clone().translate([tray.width / 3, 0])),
  subtract(slot.clone().translate([(tray.width / 3) * 2, 0])),
  subtract(slot.clone().translate([tray.width - T * 2, 0]))
);

const bottom = withSlots(path.rect(bottomGeometry));

const sideGeometry = {
  width: bottomGeometry.width,
  height: bottomGeometry.height + tray.height,
  y: backGeometry.height - tray.height
};

const side = withSlots(path.rect(sideGeometry));

module.exports = {
  tray,
  backGeometry,
  back: () => back.clone(),
  cableCenter,
  bottomGeometry,
  bottom: () => bottom.clone(),
  sideGeometry,
  side: () => side.clone()
};
