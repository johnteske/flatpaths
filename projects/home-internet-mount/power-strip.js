const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

const strip = path.rect({
  width: inches(7),
  height: inches(1 + 3 / 8)
});

module.exports = () => strip.clone();
