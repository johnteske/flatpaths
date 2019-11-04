const root = require("app-root-path");

const { mm } = require(`${root}/units`);

module.exports = {
  w: mm(54),
  h: mm(86),
  T: mm(1.75) // thickness both cards, stacked = 1.65 mm, with wiggle
};
