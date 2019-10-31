const { mm } = require("../../units");

const palm = {
  w: mm(51),
  h: mm(96.5),
  d1: mm(7.5), // body
  d2: mm(8.1), // body at camera
  camera: {
    w: mm(11),
    h: mm(19),
    offset: mm(5) // offset both x and y from edge
  },
  button: {
    y: mm(19),
    h: mm(9.75),
    w: mm(2.25)
  }
};

palm.face = {
  y: mm(10.5), // from top
  y2: mm(12) // from bottom
};
palm.face.h = palm.h - palm.face.y - palm.face.y2;

module.exports = palm;
