const { lengthSide } = require("../constructs/panels");
const { finger } = require("../constructs/finger");

const lengthSidePart = lengthSide().unite(finger());

module.exports = lengthSidePart;
