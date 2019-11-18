const root = require("app-root-path");

const path = require(`${root}/path`);

const { T } = require("../material");

const { bottom } = require("./tray");

const slotGeometry = {
  width: T,
  height: bottom.height / 2
};

const slot = path.rect(slotGeometry);

// const slots = slotPoints.map(point => slot.clone().translate(point));

// const withSlots = pipe(...slots.map(s => subtract(s)));

const withSlots = (points, target) => {
  return target;
};

module.exports = {
  slotGeometry,
  slot,
  withSlots
};
