const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

const hole = path.circle({
  radius: inches(3 / 32) / 2
});

module.exports = {
  hole: () => hole.clone()
};
