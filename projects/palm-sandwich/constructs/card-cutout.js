const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const cards = require(`${root}/objects/cards`);

const cardCutout = path.rect({
  width: cards.w,
  height: cards.h,
  radius: mm(3)
});

module.exports = () => {
  return cardCutout.clone();
};
