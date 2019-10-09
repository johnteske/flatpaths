const cut = o => {
  o.strokeColor = "#000000";
  return o;
};

const engrave = o => {
  o.strokeColor = "#ffff00";
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
