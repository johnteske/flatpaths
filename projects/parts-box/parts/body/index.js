const back = require("./back");
const side = require("./side");
const shelf = require("./shelf");
const shelfDivider = require("./shelf-divider");

module.exports = () => [back(), side(), shelf(), shelfDivider()];
