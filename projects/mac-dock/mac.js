const root = require("app-root-path");

const { mm } = require(`${root}/units`);

const mac = {
  width: mm(275), // leave room for hand
  //width: mm(349.3), // real measurement
  height: mm(15.5),
  depth: mm(240.7) + mm(1.3) // use for supporting struts, with wiggle room
};

module.exports = mac;
