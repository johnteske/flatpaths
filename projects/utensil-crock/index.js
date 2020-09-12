// TODO add rounded corners

const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { cut } = require(`${root}/d3/stroke`);

module.exports = function generate(d3, g) {
  const distributeX = spacing => selection => {
    const x = selection.data().reduce(
      (acc, cur) => ({
        _pointer: acc._pointer + cur.width + spacing,
        x: [...acc.x, acc._pointer]
      }),
      { _pointer: 0, x: [] }
    ).x;

    selection.each(function(d, i) {
      d3.select(this).attr("transform", `translate(${x[i]}, 0)`);
    });
  };

  const T = inches(1 / 8);
  const WIDTH = inches(6);
  const DEPTH = WIDTH;
  const HEIGHT = inches(8);

  const lineGenerator = d3.line();

  // side
  const sidePoints = [[0, 0], [WIDTH, 0], [WIDTH, HEIGHT], [0, HEIGHT], [0, 0]];
  // TODO add finger joints
  g.append("g")
    .datum({ width: WIDTH })
    .append("path")
    .attr("d", lineGenerator(sidePoints))
    .call(cut);

  // end
  const endOffest = T * 3;
  const endPoints = [[0, 0], [WIDTH, 0], [WIDTH, DEPTH], [0, DEPTH], [0, 0]];
  const endInnerPoints = [
    [endOffest, endOffest],
    [WIDTH - endOffest, endOffest],
    [WIDTH - endOffest, DEPTH - endOffest],
    [endOffest, DEPTH - endOffest],
    [endOffest, endOffest]
  ];
  // TODO add finger slots
  // TODO add inner cutout
  const end = g.append("g").datum({ width: WIDTH });
  end.append("path").attr("d", lineGenerator(endPoints));
  end.append("path").attr("d", lineGenerator(endInnerPoints));
  end.call(cut);

  g.selectAll("g").call(distributeX(T));
};
