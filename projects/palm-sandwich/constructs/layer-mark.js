const root = require("app-root-path");
const paper = require("paper-jsdom");

const frame = require("./frame");
const group = require(`${root}/group`);
const { score } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);
const palmCutout = require("./palm-cutout");

const x1 = palmCutout.geometry.width / 2 + palmCutout.geometry.x;
const x2 = x1;
const y1 = 0;
const y2 = frame.width;

const dx = -1 * inches(1 / 16);
const dy = 0;

const mark = new paper.Path([[x1, y1], [x2, y2]]);

const marks = n =>
  nItems(n).map((_, i) => mark.clone().translate(i * dx, i * dy));

const withMarks = (_, n) => group(_, ...marks(n).map(score));

module.exports = {
  marks,
  withMarks
};
