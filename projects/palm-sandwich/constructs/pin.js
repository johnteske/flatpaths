const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const d = mm(3);

const pinGeometry = {
  d,
  r: d / 2,
  head: {
    d: mm(10) // TODO
  }
};

const pin = path.circle({ radius: pinGeometry.r });

module.exports = {
  pinGeometry,
  pin: () => {
    return pin.clone();
  }
};
