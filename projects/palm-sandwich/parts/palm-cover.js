const root = require("app-root-path");

const path = require(`${root}/path`);
const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

//const { width } = require("../constructs/frame");
const T = require("../material");
const { pinGeometry } = require("../constructs/pin");
const { cardOuterGeometry, pins, supports } = require("../constructs/card-outer");

//const faceTop = path.rect({
//  width: cardOuterGeometry.width,
//  height: width,
//  radius: cardOuterGeometry.radius
//});

//const tabSize = pinGeometry.head.d * 2;
const tabSize = pinGeometry.head.d + T * 2;

const faceTopLeft = path.rect({
  width: tabSize,
  height: tabSize,
  radius: cardOuterGeometry.radius
});

//const faceTopRight = faceTopLeft
//  .clone()
//  .translate([cardOuterGeometry.width - tabSize, 0]);

const face = faceTopLeft
//const face = faceTop
//.unite(faceTopLeft)
//.unite(faceTopRight);

const part = pipe(...pins().map(subtract), ...supports().map(subtract))(face);

module.exports = () => part.clone();
