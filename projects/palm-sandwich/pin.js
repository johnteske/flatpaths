const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const d = mm(3);

const pinGeometry = {
  d,
  r: d / 2
};

const pin = path.circle({ radius: pinGeometry.r });

module.exports = {
  pinGeometry,
  pin: () => {
    return pin.clone();
  }
};
