const root = require("app-root-path");

const { inches } = require(`${root}/units`);
const path = require(`${root}/path`);

const { T } = require(`../material`);

const boxSize = inches(2.5);
const boxHeight = inches(1.25);
const length = boxSize + T + boxSize;

const bottomGeometry = {
  width: length,
  height: boxSize
};

const bottom = path
  .rect({
    width: boxSize,
    height: boxSize
  })
  .unite(
    path.rect({
      x: boxSize + T,
      width: boxSize,
      height: boxSize
    })
  );

const lengthSideGeometry = {
  width: length,
  height: boxHeight
};

const lengthSide = path.rect(lengthSideGeometry);

const widthSideGeometry = {
  width: boxSize,
  height: boxHeight
};
const widthSide = path.rect(widthSideGeometry);

module.exports = {
  bottomGeometry,
  bottom: () => bottom.clone(),
  lengthSideGeometry,
  lengthSide: () => lengthSide.clone(),
  widthSideGeometry,
  widthSide: () => widthSide.clone()
};
