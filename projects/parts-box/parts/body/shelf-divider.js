const root = require("app-root-path");

const { pipe } = require(`${root}/fn`);
const path = require(`${root}/path`);

const { applyFingerJoint } = require(`${root}/constructs/finger-joint2`);

const drawer = require("../../constructs/drawer");
const sideBackJoint = require("../../constructs/side-back-joint");

const dimensions = require("../../dimensions");
//const { T } = require("../../material");

//

const panel = () =>
  path.rect({
    width: drawer.height,
    height: dimensions.depth
  });

const shelfDivider = () =>
  pipe(...applyFingerJoint(sideBackJoint.jointSection("b")))(panel());

module.exports = shelfDivider;
