const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const frame = require("./frame");

const construct = path
  .rect({
    width: frame.width,
    height: frame.width * 2,
    radius: mm(0.5)
  })
  .subtract(
    path.circle({
      radius: mm(1),
      x: frame.width / 2,
      y: frame.width * 1.5
    })
  );

module.exports = {
  construct: () => construct.clone()
};
