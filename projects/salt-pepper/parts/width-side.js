const { widthSide } = require("../constructs/panels");
const { finger } = require("../constructs/finger");

const widthSidePart = widthSide().unite(finger());

module.exports = () => widthSidePart.clone();
