const fillColor = color => o => {
  o.fillColor = color;
  return o;
};

const engrave = fillColor("#880000");

module.exports = {
  fillColor,
  engrave
};
