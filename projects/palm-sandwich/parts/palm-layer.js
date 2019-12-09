const { cardOuterGeometry } = require("../constructs/card-outer");
const palmLayer = require(`../constructs/palm-layer`);
const mask = require("../constructs/half-mask");

const part = () => palmLayer.construct();

const a = () =>
  part().subtract(mask().translate([cardOuterGeometry.width / 2, 0]));
const b = () =>
  part()
    .subtract(mask())
    .translate([-cardOuterGeometry.width / 2, 0]);

module.exports = {
  components: () => [a(), b()],
  part
};
