const root = require("app-root-path");

const path = require(`${root}/path`);
const { nItems } = require(`${root}/fn`);

const { r, T, ringT } = require("../parameters.js");

const hole = path.rect({ width: T, height: T, x: (ringT - T) / 2, y: r });

const pattern = n =>
  nItems(n).map((_, i) => hole.clone().rotate(15 + i * 30, [r, r]));

module.exports = pattern;
