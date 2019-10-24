const cut = o => {
  o.strokeColor = "#000000";
  return o;
};

const engrave = o => {
  o.strokeColor = "#ff00ff";
  return o;
};

const guide = o => {
  o.strokeColor = "#00ffff";
  return o;
};

module.exports = {
  cut,
  engrave,
  guide
};
