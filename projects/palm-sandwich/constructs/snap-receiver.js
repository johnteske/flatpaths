const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);
const { translate } = require(`${root}/transform`);
const usb = require("./usb-port-cutout");
const { cardOuterGeometry } = require("./card-outer");

const geometry = {
  width: (cardOuterGeometry.width - usb.geometry.width) / 2
};
geometry.height = geometry.width;

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
    height: geometry.height / 3,
    radius: mm(0.5)
  })
  .unite(
    path.rect({
      width: geometry.width / 3,
      x: geometry.width / 3,
      y: geometry.width / 3,
      height: geometry.height / 3
    })
  )
  .unite(
    path.rect({
      width: geometry.width,
      height: geometry.height / 3,
      y: geometry.height * (2 / 3),
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
