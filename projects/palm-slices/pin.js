// const { mm } = require("../../units");

const pin = T => {
  const _pin = {
    // d: mm(3)
    width: 2 * T,
    height: T,
    margin: {
      top: T,
      bottom: T
    },
    outer: {}
  };
  // pin.r = pin.d / 2;
  _pin.outer.height = _pin.margin.top + _pin.height + _pin.margin.bottom;
  return _pin;
};

module.exports = pin;
