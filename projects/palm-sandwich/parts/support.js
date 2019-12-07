const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const T = require("../material");

// TODO should reference construct

const part = path.rect({
  width: T + mm(0.2), // adjust for kerf
  height: T * 4 // enough for layers
});

module.exports = () => part.clone();
