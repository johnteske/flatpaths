const rotate = theta => ([x, y]) => {
  const radians = theta * (Math.PI / 180);
  return [
    x * Math.cos(radians) - y * Math.sin(radians),
    y * Math.cos(radians) + x * Math.sin(radians)
  ];
};

module.exports = {
  rotate
};
