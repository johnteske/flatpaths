const paper = require("paper-jsdom");
const path = require("./path");
const { guide } = require("./stroke");

const withRoundedCorner = (center, radius, corner) => {
  const translateMap = {
    nw: [center[0] - radius, center[1] - radius],
    ne: [center[0], center[1] - radius],
    sw: [center[0] - radius, center[1]],
    se: [center[0], center[1]],
  };

  const cutout = path
    .rect({
      width: radius,
      height: radius
    })
    .translate(translateMap[corner]);
  guide(cutout.clone());
  const rounded = new paper.Path.Circle({ center, radius });
  guide(rounded.clone());
  const roundedCorner = rounded.intersect(cutout);

  return target => target.subtract(cutout).unite(roundedCorner);
};

module.exports = withRoundedCorner;
