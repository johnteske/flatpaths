const root = require("app-root-path");

const { inches, mm } = require(`${root}/units`);

const r = inches(5);
const T = mm(3.2);

const ringT = T * 3;

module.exports = {
  r,
  T,
  ringT
};
