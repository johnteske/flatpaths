const paper = require("paper-jsdom");
const path = require("./path");

const cornerCutout = radius =>
  path.rect({
    width: radius,
    height: radius
  });

const withRoundedCorner = (target, center, radius, corners) => {
  const translateMap = {
    nw: [center[0] - radius, center[1] - radius]
  };

  return target
    .subtract(cornerCutout(radius).translate(translateMap["nw"]))
    .unite(new paper.Path.Circle({ center, radius }));
};

module.exports = withRoundedCorner;
