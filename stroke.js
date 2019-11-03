const cut = o => {
  o.strokeColor = "#000000";
  return o;
};

const score = o => {
  o.strokeColor = "#ff00ff";
  return o;
};

const guide = o => {
  o.strokeColor = "#00ffff";
  return o;
};

module.exports = {
  cut,
  score,
  guide
};
