const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const palm = require(`${root}/objects/palm`);

const { width } = require("./frame");
const { cardOuterGeometry } = require("./card-outer");

const frameWidth = (cardOuterGeometry.width - palm.w) / 2;

const externalButtonHeight = mm(1);

const h = palm.button.h;
const x = frameWidth + palm.w;
const y = width + palm.button.y;

const buttonBase = path.rect({
  width: frameWidth / 2,
  height: h * 2
});

const button = path.rect({
  width: frameWidth + externalButtonHeight,
  height: h,
  y: h / 2
});

const _button = buttonBase.unite(button);

module.exports = {
  button: () => _button.clone(),
  buttonTranslated: () => _button.clone().translate([x, y])
};
