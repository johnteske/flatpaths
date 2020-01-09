const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);
const usb = require("./usb-port-cutout");
const { cardOuterGeometry } = require("./card-outer");
const geometry = {
  width: (cardOuterGeometry.width - usb.geometry.width) / 2,
  height: 100
};

const construct = path.rect({
  ...geometry,
  radius: mm(0.5)
});

const constructTranslated = () =>
  construct
    .clone()
    .translate(
      cardOuterGeometry.width - geometry.width,
      cardOuterGeometry.height
    );

module.exports = {
  geometry,
  construct: () => construct.clone(),
  constructTranslated
};
