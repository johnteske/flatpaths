const strokeColor = color => o => {
  o.strokeColor = color;
  return o;
};

const cut = strokeColor("#000000");

const score = strokeColor("#ff00ff");

const guide = strokeColor("#00ffff");

module.exports = {
  strokeColor,
  cut,
  score,
  guide
};
