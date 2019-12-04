const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const cards = require(`${root}/objects/cards`);

const { width } = require("../constructs/frame");
const { cardOuterGeometry } = require("../constructs/card-outer");

const cutout = path.rect({
  width: cards.w,
  height: cards.h,
  radius: mm(3)
});
cutout.translate([width, (cardOuterGeometry.height - cards.h) / 2]);

module.exports = () => {
  return cutout.clone();
};
