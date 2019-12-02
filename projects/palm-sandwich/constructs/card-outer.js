const root = require("app-root-path");

const path = require(`${root}/path`);
const cards = require(`${root}/objects/cards`);
const palm = require(`${root}/objects/palm`);

const T = require("../material");

const { width: frameWidth } = require("./frame");

//const pins = () => group(
//  [
//    [frameWidth / 2, frameWidth / 2],
//    [cardOuter.width - frameWidth / 2, frameWidth / 2],
//    [frameWidth / 2, cardOuter.height - frameWidth / 2],
//    [cardOuter.width - frameWidth / 2, cardOuter.height - frameWidth / 2]
//  ].map(point => pin().translate(point))
//);

const cardOuterGeometry = {
  width: frameWidth + cards.w + frameWidth,
  height: frameWidth + palm.h + frameWidth,
  radius: T
};

const cardOuter = path.rect(cardOuterGeometry);

module.exports = {
  cardOuterGeometry,
  cardOuter: () => cardOuter.clone()
};
