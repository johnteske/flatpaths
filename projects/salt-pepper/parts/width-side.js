const root = require("app-root-path");

const { unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { widthSide } = require("../constructs/panels");

const { widthLengthFingers } = require("../constructs/joints");

const widthSidePart = pipe(...widthLengthFingers().map(unite))(widthSide());

module.exports = () => widthSidePart.clone();
