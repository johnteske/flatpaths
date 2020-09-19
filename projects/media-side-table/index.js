const root = require("app-root-path");

const { axoProjMat } = require(`${root}/axonometric`);

const project = axoProjMat.project.bind(axoProjMat);

const extrude = thickness => ({ x, y, z }) => ({ x, y, z: z - thickness });

const T = 10;

const rect = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
  [0, 0] // close path
];

module.exports = function(d3, g) {
  // 2D
  g.append("path")
    .attr("d", d3.line()(rect))
    .attr("stroke", "cyan")
    .attr("fill", "none");

  // 3D projection
  const lineGenerator = d3
    .line()
    .x(o => o.x)
    .y(o => o.y);

  const _points = rect.map(([x, y]) => ({ x, y, z: 0 }));

  g.append("path")
    .attr(
      "d",
      [
        lineGenerator(_points.map(_ => project(_))),
        lineGenerator(_points.map(extrude(T)).map(_ => project(_))),
        ..._points.map(p =>
          lineGenerator([p, extrude(T)(p)].map(_ => project(_)))
        )
      ].join(" ")
    )
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("transform", `translate(100, 100)`);
};
