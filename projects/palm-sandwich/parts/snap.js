const root = require("app-root-path");

const path = require(`${root}/path`);

const _part = path.rect({
  width: 100,
  height: 100
});

module.exports = {
  part: () => _part.clone()
};
