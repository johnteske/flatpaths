const root = require("app-root-path");

const path = require(`${root}/path`);
const cards = require(`${root}/objects/cards`);
const palm = require(`${root}/objects/palm`);
const { mm } = require(`${root}/units`);

const frame = require("./frame");
const support = require("./support-pin");
//const usbPortCutout = require("./usb-port-cutout");
const { pin, pinGeometry } = require("./pin");
const T = require("../material");

// this could also be thought of as padding
// for pins with smaller heads
//const headRadius = pinGeometry.head.r;

const cardOuterGeometry = {
  width: frame.width + cards.w + frame.width,
  height: frame.width + palm.h + frame.width,
  radius: frame.width + mm(1) // TODO same as palm cover
};

const cardOuter = path.rect(cardOuterGeometry);

//const x1 = palmCutout.geometry.x
const x1 = frame.width + mm(1);
//const x1 = headRadius;
const x2 = cardOuterGeometry.width - x1;
const y1 = x1;
//const y1 = headRadius;
const y2 = cardOuterGeometry.height - y1;
const pinPoints = [[x1, y1], [x2, y1], [x1, y2], [x2, y2]];
const pins = withHead => pinPoints.map(point => pin(withHead).translate(point));

//const topXOffset = pinGeometry.head.d + support.geometry.radius;
// TODO circular dependency in importing usbPortCutout
//const topXOffset = usbPortCutout.geometry.x - T;
const topXOffset = (cardOuterGeometry.width - mm(12)) / 2 - T;
const frameMidY = cardOuterGeometry.height / 2;

const supportPoints = [
  // corners
  [topXOffset, frame.width / 2],
  [cardOuterGeometry.width - topXOffset, frame.width / 2],
  [topXOffset, cardOuterGeometry.height - frame.width / 2],
  [
    cardOuterGeometry.width - topXOffset,
    cardOuterGeometry.height - frame.width / 2
  ],
  // left side
  [frame.width / 2, frameMidY],
  // right side
  [cardOuterGeometry.width - frame.width / 2, frame.width + palm.button.y - T],
  [
    cardOuterGeometry.width - frame.width / 2,
    frame.width + palm.button.y + palm.button.h + T
  ]
];

const supportHoles = () => supportPoints.map(p => support.hole().translate(p));

module.exports = {
  cardOuterGeometry,
  cardOuter: () => cardOuter.clone(),
  pins,
  pinPoints,
  supportHoles
};
