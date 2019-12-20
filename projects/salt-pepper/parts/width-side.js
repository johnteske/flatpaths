const root = require("app-root-path");

const { inches } = require(`${root}/units`);
const { unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { widthSide } = require("../constructs/panels");
const { widthLengthFingers } = require("../constructs/joints");
const { T } = require("../material");

const widthSidePart = pipe(
  ...widthLengthFingers().map(unite),
  ...widthLengthFingers()
    .map(f => f.translate([inches(2.5) + T, 0]))
    .map(unite)
)(widthSide());

module.exports = () => widthSidePart.clone();
