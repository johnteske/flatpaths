const paper = require("paper-jsdom");
const path = require("./path");

const withRoundedCorner = (target, center, radius, corners) => {
  const translateMap = {
    nw: [center[0] - radius, center[1] - radius]
  };

  const cutout = path
    .rect({
      width: radius,
      height: radius
    })
    .translate(translateMap["nw"]);

  const rounded = new paper.Path.Circle({ center, radius });
  const roundedCorner = rounded.intersect(cutout);

  return target.subtract(cutout).unite(roundedCorner);
};

module.exports = withRoundedCorner;
