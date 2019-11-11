const root = require("app-root-path");

const path = require(`${root}/path`);

const { T } = require("../material");

const { bottom } = require("./tray");

const slotGeometry = {
  width: T,
  height: bottom.height / 2
};

const slot = path.rect(slotGeometry);

module.exports = {
  slotGeometry,
  slot
};
