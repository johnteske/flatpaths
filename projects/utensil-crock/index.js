const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { cut } = require(`${root}/d3/stroke`);

module.exports = function generate(d3, g) {
  const distributeX = (spacing) => selection => {
    const x = selection
      .data()
      .reduce(
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

  const T = inches(1/8)
  const WIDTH = inches(6);
  const DEPTH = WIDTH;
  const HEIGHT = inches(8);

  const lineGenerator = d3.line();

  const sidePoints = [[0, 0], [WIDTH, 0], [WIDTH, HEIGHT], [0, HEIGHT], [0, 0]];

  // side
  g.append("g")
    .datum({ width: WIDTH })
    .append("path")
    .attr("d", lineGenerator(sidePoints))
    .call(cut);

  const endPoints = [[0, 0], [WIDTH, 0], [WIDTH, DEPTH], [0, DEPTH], [0, 0]];

  // end
  g.append("g")
    .datum({ width: WIDTH })
    .append("path")
    .attr("d", lineGenerator(endPoints))
    .call(cut);

  g.selectAll("g").call(distributeX(T));
};
