const root = require("app-root-path");
const path = require(`${root}/path`);
const pi4 = require("../objects/pi4");

module.exports = path.rect({
  width: pi4.width + pi4._overhang * 2,
  height: pi4._length + pi4._overhang * 2,
  radius: pi4.radius
});
