const radians = function(degrees) {
  return (degrees * Math.PI) / 180;
};

// TODO rename move by angle
function move([x, y], angle, unit) {
  var rad = radians(angle % 360);

  return [x + unit * Math.sin(rad), y + unit * Math.cos(rad)];
}

const rotate = degrees => ([x, y]) => {
  const radians = radians(degrees);
  return [
    x * Math.cos(radians) - y * Math.sin(radians),
    y * Math.cos(radians) + x * Math.sin(radians)
  ];
};

module.exports = {
  rotate,
  move
};
