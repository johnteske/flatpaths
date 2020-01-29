const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm, inches } = require(`${root}/units`);

const { pinGeometry } = require("./pin");
const { hole } = require("./support-pin");

// use a consistent size to keep connectors between iterations
const unit = mm(6);

const outerGeometry = {
  height: unit + inches(1.125) + unit
};
const outer = path
  .rect({ width: unit * 2, height: outerGeometry.height, radius: mm(0.5) })
  .unite(path.circle({ radius: unit, x: unit }))
  .subtract(path.circle({ radius: pinGeometry.r, x: unit }))
  .subtract(hole().translate(unit, outerGeometry.height - unit / 2));
// TODO need a method to connect to outer layers
const middle = path
  .rect({
    width: unit * 2,
    height: unit,
    radius: mm(0.5)
  })
  .subtract(hole().translate(unit, unit / 2));

module.exports = {
  outer: () => outer.clone(),
  middle: () => middle.clone()
};
