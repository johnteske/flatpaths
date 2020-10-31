function radians(degrees) {
  return (degrees * Math.PI) / 180;
}

// TODO rename move by angle
function move([x, y], angle, unit) {
  var rad = radians(angle % 360);

  return [x + unit * Math.sin(rad), y + unit * Math.cos(rad)];
}

const rotate = degrees => ([x, y]) => {
  const rad = radians(degrees);
  return [
    x * Math.cos(rad) - y * Math.sin(rad),
    y * Math.cos(rad) + x * Math.sin(rad)
  ];
};

module.exports = {
  rotate,
  move
};
