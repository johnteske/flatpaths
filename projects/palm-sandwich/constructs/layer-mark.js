const root = require("app-root-path");
const paper = require("paper-jsdom");

const frame = require("./frame");
const group = require(`${root}/group`);
const { score } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);

const y = frame.width + mm(9);
const mark = new paper.Path([[0, y], [frame.width, y]]);

const marks = n => nItems(n).map((_, i) => mark.clone().translate(0, i * 10));

const withMarks = (_, n) => group(_, ...marks(n).map(score));

module.exports = {
  marks,
  withMarks
};
