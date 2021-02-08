const stroke = color => selection => {
  return selection.attr("fill", "none").attr("stroke", color);
};

const cut = stroke("black");
const guide = stroke("cyan");

module.exports = {
  stroke,
  cut,
  guide
};
