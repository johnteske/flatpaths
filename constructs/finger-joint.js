const root = require("app-root-path");

const path = require(`${root}/path`);

const fingerJoint = ({ width, height, n }) => {
  const _width = width / n;
  const _finger = path.rect({
    width: _width,
    height
  });

  return () => {
    let fingers = [];
    for (let i = 0; i < n; i += 2) {
      fingers.push(_finger.clone().translate([i * _width, 0]));
    }
    return fingers;
  };
};

module.exports = fingerJoint;
