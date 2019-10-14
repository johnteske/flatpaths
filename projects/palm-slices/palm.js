const { mm } = require("../../units");

module.exports = {
  w: mm(51),
  h: mm(96.5),
  d1: mm(7.5), // body
  d2: mm(8.1), // body at camera
  camera: {
    w: mm(11),
    h: mm(19),
    offset: mm(5) // offset both x and y from edge
  }
};
