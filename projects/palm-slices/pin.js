// const { mm } = require("../../units");

const pin = T => {
  const _pin = {
    // d: mm(3)
    width: 2 * T,
    height: T,
    box: {}
  }
  // pin.r = pin.d / 2;
  _pin.box.height = T + _pin.height + T; // add vertical padding
  return _pin;
};

module.exports = pin
