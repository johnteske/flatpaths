// TODO this needs to be the "B" part
//
const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);

const path = require(`${root}/path`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const dimensions = require("../../dimensions");

const shelfBackJoint = require("../../constructs/shelf-back-joint");

//

const panel = () =>
  path.rect({
    width: dimensions.width,
    height: dimensions.depth
  });

const shelf = () =>
  pipe(...shelfBackJoint.joint().flatMap(applyFingerJoint))(panel());

module.exports = shelf;
