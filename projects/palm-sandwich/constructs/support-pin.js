const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

// FABORY Steel Slotted Spring Pin
const diameter = inches(1 / 16);
const geometry = {
  diameter,
  radius: diameter / 2
};
const hole = path.circle({
  radius: geometry.radius
});

module.exports = {
  geometry,
  hole: () => hole.clone()
};
