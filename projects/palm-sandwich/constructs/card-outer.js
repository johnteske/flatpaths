const root = require("app-root-path");

const path = require(`${root}/path`);
const cards = require(`${root}/objects/cards`);
const palm = require(`${root}/objects/palm`);

const T = require("../material");

const { width: frameWidth } = require("./frame");
const { pin, pinGeometry } = require("./pin");

// this could also be thought of as padding
// for pins with smaller heads
const headRadius = pinGeometry.head.r;

const cardOuterGeometry = {
  width: frameWidth + cards.w + frameWidth,
  height: frameWidth + palm.h + frameWidth,
  radius: pinGeometry.head.r
};

const cardOuter = path.rect(cardOuterGeometry);

const x1 = headRadius;
const x2 = cardOuterGeometry.width - headRadius;
const y1 = headRadius;
const y2 = cardOuterGeometry.height - headRadius;
const pins = withHead =>
  [[x1, y1], [x2, y1], [x1, y2], [x2, y2]].map(point =>
    pin(withHead).translate(point)
  );

const support = path.rect({
  width: T,
  height: T,
  x: cardOuterGeometry.width - frameWidth / 2 - T / 2,
  y: cardOuterGeometry.height / 2 - T / 2
});
const supports = () => [support.clone()];

module.exports = {
  cardOuterGeometry,
  cardOuter: () => cardOuter.clone(),
  pins,
  supports
};
