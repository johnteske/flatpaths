const rotate = (...args) => target => target.rotate(...args);

const translate = (...args) => target => target.translate(...args);
const translateX = x => target => target.translate([x, 0]);
const translateY = y => target => target.translate([0, y]);

module.exports = {
  rotate,
  translate,
  translateX,
  translateY
};
