const root = require("app-root-path");

const path = require(`${root}/path`);
const cards = require(`${root}/objects/cards`);
const palm = require(`${root}/objects/palm`);

const { width: frameWidth } = require("./frame");
const { pin, pinGeometry } = require("./pin");

const cardOuterGeometry = {
  width: frameWidth + cards.w + frameWidth,
  height: frameWidth + palm.h + frameWidth,
  radius: pinGeometry.head.r
};

const cardOuter = path.rect(cardOuterGeometry);

const pins = withHead =>
  [
    [frameWidth / 2, frameWidth / 2],
    [cardOuterGeometry.width - frameWidth / 2, frameWidth / 2],
    [frameWidth / 2, cardOuterGeometry.height - frameWidth / 2],
    [
      cardOuterGeometry.width - frameWidth / 2,
      cardOuterGeometry.height - frameWidth / 2
    ]
  ].map(point => pin(withHead).translate(point));

module.exports = {
  cardOuterGeometry,
  cardOuter: () => cardOuter.clone(),
  pins
};
