const root = require("app-root-path");
const { nItems } = require(`${root}/fn`);
const point = require("./point");

module.exports = {
  points: (sides, size) => {
    const start = [0, -size];
    const angle = 360 / sides;
    return nItems(sides).map((_, i) => point.rotate(i * angle)(start));
  },
  sideLengthFromRadius: (sides, r) => 2 * r * Math.sin(Math.PI / sides)
};
