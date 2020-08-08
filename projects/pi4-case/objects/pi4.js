const root = require("app-root-path");
const { mm } = require(`${root}/units`);

const pi4 = {
  width: mm(85),
  _length: mm(56),
  height: mm(16),
  radius: mm(3),
  _overhang: mm(3) // amount that some ports hang over PCB
};

pi4._connections = {
  ethernet: [pi4.width, pi4._length - mm(45.75)],
  usb1: [pi4.width, pi4._length - mm(9)],
  usb2: [pi4.width, pi4._length - mm(27)],
  power: [mm(3.5 + 7.7), pi4._length]
};

module.exports = pi4;
