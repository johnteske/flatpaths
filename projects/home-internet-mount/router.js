const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

// TODO these are approx measurements
const router = path.rect({
  width: inches(5),
  height: inches(9)
});

// TODO approx
const x = router.bounds.width;
const h = router.bounds.height;
const connections = {
  power: [x, h - inches(6 + 5 / 8)],
  ethernetIn: [x, h - inches(5 + 1 / 8)],
  ethernet1: [x, h - inches(4 + 3 / 8)],
  ethernet2: [x, h - inches(3 + 7 / 8)],
  ethernet3: [x, h - inches(3 + 2 / 8)],
  ethernet4: [x, h - inches(2 + 6 / 8)]
};

router.data = {
  connections
};

module.exports = () => router.clone();
