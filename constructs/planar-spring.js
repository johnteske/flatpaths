const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { subtract, unite } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);
const { mm } = require(`${root}/units`);
const { flipH, flipV } = require(`${root}/transform`);

const construct = ({ T, w1, w2, h }) => {
  const hUnit = h / 8;

  //const compressedSectionWidth = T * 2;
  const nSections = 1;
  //const nSections = w1 / compressedSectionWidth;
  const expandedSectionWidth = w2 / nSections;

  const x = [
    0,
    expandedSectionWidth / 2 - T,
    expandedSectionWidth / 2,
    expandedSectionWidth - T
  ];

  const _node = path.rect({ width: T, height: hUnit });
  const _link = new paper.Path([
    [x[0], hUnit * 2],
    [x[1], 0],
    [x[2], 0],
    [T, hUnit * 2],
    [x[0], hUnit * 2]
  ]);

  // TODO this is only a single spring section
  return pipe(
    // left node
    unite(_node.clone().translate(x[0], hUnit * 3)),
    unite(_node.clone().translate(x[0], hUnit * 4)),
    // left links
    unite(_link.clone().translate(x[0], hUnit)),
    unite(
      _link
        .clone()
        .scale(1, -1)
        .translate(x[0], hUnit * 5)
    ),
    // center left node
    unite(_node.clone().translate(x[1], 0)),
    unite(_node.clone().translate(x[1], hUnit * 7)),
    // center right node
    unite(_node.clone().translate(x[2], 0)),
    unite(_node.clone().translate(x[2], hUnit * 7)),
    // right links
    unite(
      _link
        .clone()
        .scale(-1, 1)
        .translate(x[2], hUnit)
    ),
    unite(
      _link
        .clone()
        .scale(-1, -1)
        .translate(x[2], hUnit * 5)
    ),
    // right node
    unite(_node.clone().translate(x[3], hUnit * 3)),
    unite(_node.clone().translate(x[3], hUnit * 4))
  )(path.rect());
};

module.exports = construct;
