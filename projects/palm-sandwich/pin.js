const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const d = mm(3);

const pin = path.circle({ radius: d / 2 });

module.exports = () => {
  return pin.clone();
};
