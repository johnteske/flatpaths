const { button } = require("../constructs/button");

const part = button();
part.x = 0;
part.y = 0;

module.exports = () => part.clone();
