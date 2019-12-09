const root = require("app-root-path");

const path = require(`${root}/path`);

const { cardOuterGeometry } = require("./card-outer");

const mask = () =>
  path.rect({
    width: cardOuterGeometry.width / 2,
    height: cardOuterGeometry.height
  });

module.exports = mask;
