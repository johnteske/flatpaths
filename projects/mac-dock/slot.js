const root = require("app-root-path");

const path = require(`${root}/path`);
//const { mm } = require(`${root}/units`);

const { T } = require("./material");
const { bottom } = require("./tray");

// TODO duplicated
const slotGeometry = {
  width: T,
  height: bottom.height / 2
};
//slotGeometry.y = bottomGeometry.height + bottomGeometry.y - slotGeometry.height;
const slot = path.rect(slotGeometry);

module.exports = {
  slotGeometry,
  slot
};
