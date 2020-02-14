const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm, inches } = require(`${root}/units`);

const { pinGeometry } = require("./pin");
const { hole } = require("./support-pin");

// use a consistent size to keep connectors between iterations
const unit = mm(6);

const beltHeight = inches(1.125);

const outerGeometry = {
  height: unit + beltHeight
};
const outer = path
  .rect({ width: unit * 2, height: outerGeometry.height, radius: mm(1) })
  .unite(path.circle({ radius: unit, x: unit }))
  .subtract(path.circle({ radius: pinGeometry.r, x: unit }))
  .subtract(
    path.circle({ radius: pinGeometry.r, x: unit, y: unit + beltHeight / 3 })
  )
  .subtract(
    path.circle({
      radius: pinGeometry.r,
      x: unit,
      y: unit + (beltHeight * 2) / 3
    })
  );

module.exports = {
  outer: () => outer.clone()
};
