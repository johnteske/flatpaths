const root = require("app-root-path");

const { axoProjMat, P3 } = require(`${root}/axonometric`);

const p = axoProjMat.project.bind(axoProjMat);

const rect = [P3(0, 0, 0), P3(100, 0, 0), P3(100, 100, 0), P3(0, 100, 0)];

module.exports = function(d3, g) {
  const points = rect.map(_ => p(_));
  console.log(points);

  const lineGenerator = d3
    .line()
    .x(o => o.x)
    .y(o => o.y);

  g.append("path")
    .attr("d", lineGenerator(points))
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("transform", `translate(100, 0)`);
};
