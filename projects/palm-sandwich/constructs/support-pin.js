const root = require("app-root-path");

const path = require(`${root}/path`);

const T = require("../material");

const hole = path.rect({
  width: T,
  height: T
});

module.exports = {
  hole: () => hole.clone()
};
