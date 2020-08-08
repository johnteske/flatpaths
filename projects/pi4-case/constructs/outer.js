const root = require("app-root-path");
const path = require(`${root}/path`);
const pi4 = require("../objects/pi4");

const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

const connections = objectMap(pi4._connections, ([x, y]) =>
  [x, y].map(p => p + pi4._overhang)
);

const outer = path.rect({
  width: pi4.width + pi4._overhang * 2,
  height: pi4._length + pi4._overhang * 2,
  radius: pi4.radius
});

outer.data = { connections };
module.exports = outer;
