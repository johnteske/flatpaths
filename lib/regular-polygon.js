const root = require("app-root-path");
const d3 = require("d3");
const { nItems } = require(`${root}/fn`);
const point = require("./point");

const radians = function(degrees) {
  return (degrees * Math.PI) / 180;
};

function move([x, y], angle, unit) {
  var rad = radians(angle % 360);

  return [x + unit * Math.sin(rad), y + unit * Math.cos(rad)];
}

const path = (points, radius = 0) => {
  if (radius === 0) {
    return d3.line()(points) + "Z";
  }

  return (
    points
      .map(([x, y], i) => {
        const sides = points.length; // TODO
        const angle = 360 / sides;
        const a1 = -angle * (i + 1);
        const a2 = a1 + angle * 2;
        const before = move([x, y], a1, radius);
        const after = move([x, y], a2, radius);
        return (
          `${i === 0 ? "M" : "L"}${before[0]},${before[1]}` +
          `Q${x},${y}` +
          ` ${after[0]},${after[1]}`
        );
      })
      .join("") + "Z"
  );
};

module.exports = {
  points: (sides, size) => {
    const start = [0, -size];
    const angle = 360 / sides;
    return nItems(sides).map((_, i) => point.rotate(i * angle)(start));
  },
  path,
  sideLengthFromRadius: (sides, r) => 2 * r * Math.sin(Math.PI / sides)
};
