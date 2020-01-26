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
  const _node = path.rect({ width: T, height: hUnit });
  const _link = new paper.Path([
    [0, hUnit * 2],
    [T * 2, 0],
    [T * 3, 0],
    [T, hUnit * 2],
    [0, hUnit * 2]
  ]);

  // TODO this is only a single spring section
  return pipe(
    // left node
    unite(_node.clone().translate(0, hUnit * 3)),
    unite(_node.clone().translate(0, hUnit * 4)),
    // left links
    unite(_link.clone().translate(0, hUnit)),
    unite(
      _link
        .clone()
        .scale(1, -1)
        .translate(0, hUnit * 5)
    ),
    // center left node
    unite(_node.clone().translate(T * 2, 0)),
    unite(_node.clone().translate(T * 2, hUnit * 7)),
    // center right node
    unite(_node.clone().translate(T * 3, 0)),
    unite(_node.clone().translate(T * 3, hUnit * 7)),
    // right links
    unite(
      _link
        .clone()
        .scale(-1, 1)
        .translate(T * 3, hUnit)
    ),
    unite(
      _link
        .clone()
        .scale(-1, -1)
        .translate(T * 3, hUnit * 5)
    ),
    // right node
    unite(_node.clone().translate(T * 5, hUnit * 3)),
    unite(_node.clone().translate(T * 5, hUnit * 4))
  )(path.rect());
};

module.exports = construct;
