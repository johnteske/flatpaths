const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

// TODO approx measurements
// cables come out right side
const router = path.rect({
  width: inches(5),
  height: inches(9)
});

module.exports = () => router.clone();
