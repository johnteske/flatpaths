const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);
const { translate } = require(`${root}/transform`);

const T = require("../material");

const usb = require("./usb-port-cutout");
const { cardOuterGeometry } = require("./card-outer");

const geometry = {
  width: (cardOuterGeometry.width - usb.geometry.width) / 2
};
geometry.height = T * 3;

const cover = path.rect({
  ...geometry,
  radius: mm(0.5)
});

const _translate = translate(
  cardOuterGeometry.width - geometry.width,
  cardOuterGeometry.height
);

const receiver = path
  .rect({
    width: geometry.width,
    height: T,
    radius: mm(0.5)
  })
  .unite(
    path.rect({
      width: T * 2, // TODO match snap part
      x: geometry.width / 2 - T,
      y: T,
      height: T
    })
  )
  .unite(
    path.rect({
      width: T * 4, // TODO match snap part
      height: T,
      x: geometry.width / 2 - T * 2,
      y: T * 2,
      radius: mm(0.5)
    })
  );

module.exports = {
  geometry,
  cover: () => cover.clone(),
  coverTranslated: () => _translate(cover.clone()),
  receiver: () => receiver.clone(),
  receiverTranslated: () => _translate(receiver.clone())
};
