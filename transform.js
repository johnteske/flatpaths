const rotate = (...args) => target => target.rotate(...args);

const translate = (...args) => target => target.translate(...args);
const translateX = x => target => target.translate([x, 0]);
const translateY = y => target => target.translate([0, y]);

const scale = (...args) => target => target.scale(...args);
const flipH = target => target.scale(-1, 1);
const flipV = target => target.scale(1, -1);

module.exports = {
  rotate,
  translate,
  translateX,
  translateY,
  scale,
  flipH,
  flipV
};
