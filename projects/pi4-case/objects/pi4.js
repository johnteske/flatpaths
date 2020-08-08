const root = require("app-root-path");
const { mm } = require(`${root}/units`);

module.exports = {
  width: mm(85),
  _length: mm(56),
  height: mm(16),
  radius: mm(3),
  _overhang: mm(3) // amount that some ports hang over PCB
};
