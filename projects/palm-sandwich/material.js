const root = require("app-root-path");

const { inches } = require(`${root}/units`);

const T = inches(1 / 8);

module.exports = T;
