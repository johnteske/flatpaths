const root = require("app-root-path");
const { inches } = require(`${root}/units`);

const T = inches(1 / 8); // thickness of main body material

module.exports = { T };
