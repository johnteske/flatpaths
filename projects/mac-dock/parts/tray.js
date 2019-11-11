const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe } = require(`${root}/fn`);
const { subtract } = require(`${root}/boolean`);

const { T } = require("../material");
const { slotGeometry, slot } = require("../constructs/slot");
const {
  tray,
  back: backGeometry,
  bottom: bottomGeometry
} = require("../constructs/tray");

const back = path.rect(backGeometry);

const slotY = bottomGeometry.height + bottomGeometry.y - slotGeometry.height;

const slotPoints = [
  [T * 2, slotY],
  [tray.width / 3, slotY],
  [(tray.width / 3) * 2, slotY],
  [tray.width - T * 2, slotY]
];

const slots = slotPoints.map(point => slot.clone().translate(point));

const withSlots = pipe(...slots.map(s => subtract(s)));

const bottom = withSlots(path.rect(bottomGeometry));

const sideGeometry = {
  width: bottomGeometry.width,
  height: bottomGeometry.height + tray.height,
  y: backGeometry.height - tray.height
};

const side = withSlots(path.rect(sideGeometry));

module.exports = {
  back: () => back.clone(),
  bottom: () => bottom.clone(),
  side: () => side.clone()
};
