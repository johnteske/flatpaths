const bottom = require("./bottom");
const depthSide = require("./depth-side");
//const widthSide = require("./width-side");
//const divider = require("./divider");

module.exports = () => [bottom(), depthSide() /*, widthSide()*/];
