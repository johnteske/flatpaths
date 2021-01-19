const root = require("app-root-path");
const polygon = require(`${root}/lib/regular-polygon`);
const { mm, inches } = require(`${root}/units`);
const { cut, guide } = require(`${root}/d3/stroke`);

const moca = require(`${root}/constructs/actiontec-moca-ECB6250K02`);

const router = {
  baseID: inches(4 + 3 / 4),
  baseOD: inches(5.5)
};

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);
  // const WIDTH = inches(1) + mm(3.3);

  const rimT = inches(1.5);
  const OUTER_DIAMETER = router.baseOD + rimT;
  const RADIUS = OUTER_DIAMETER / 2;

  // router base
  g.append("circle")
    .attr("r", router.baseOD / 2)
    .attr("cx", RADIUS)
    .attr("cy", RADIUS)
    .call(guide);

  // outer
  g.append("circle")
    .attr("r", RADIUS)
    .attr("cx", RADIUS)
    .attr("cy", RADIUS)
    .call(cut);

  //const polyPoints0 = polygon.points(6, RADIUS);
  const polyPoints0 = polygon.points(6, RADIUS + inches(3 / 4));
  g.append("path")
    .attr("d", polygon.path(polyPoints0, T))
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(guide);

  //  // TODO get side tangent to outer circle
  //  const polyPoints = polygon.points(6, RADIUS + 4 * T);
  //  g.append("path")
  //    .attr("d", polygon.path(polyPoints, T))
  //    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
  //    .call(guide);

  // ports
  const ports = [0, 1, 2, 3, -1, -2, -3].map(y => y * mm(12));
  const portX = OUTER_DIAMETER - 2 * T;
  g.selectAll(".port")
    .data(ports)
    .enter()
    .append("circle")
    .attr("r", mm(3)) // TODO regular CAT 6 is about 6 mm in diameter?
    .attr("cx", portX)
    .attr("cy", d => RADIUS + d)
    .call(cut);

  moca.mount(g, T).attr("transform", `translate(${3 * T}, ${3 * T})`);

  //  // side
  //  const sideL = polygon.sideLengthFromRadius(6, RADIUS);
  //  const sidePoints = [
  //    [0, 0],
  //    [sideL, 0],
  //    [sideL, sideL],
  //    //
  //    [sideL - T, sideL],
  //    [2 * sideL / 3, sideL - 4*T],
  //    [sideL / 3, sideL - 4*T],
  //    [T, sideL],
  //    //
  //    [0, sideL]
  //  ];
  //  g.append("path")
  //    .attr(
  //      "d",
  //      sidePoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`) + "Z"
  //    )
  //    .attr("transform", `translate(${OUTER_DIAMETER + 2 * T}, 0)`)
  //    .call(cut);

  //  // bottom wall
  //  g.append("rect")
  //    .attr("width", 2 * Math.PI * RADIUS)
  //    .attr("height", OUTER_DIAMETER)
  //    .call(cut);
  //
  //  // living hinge
  //  // TODO alternate columns
  //  for (let i = 0; i < 10; i++) {
  //    g.append("rect")
  //      .attr("width", T)
  //      .attr("height", T * 2)
  //      .attr("x", i * T * 2)
  //      .call(cut);
  //  }
};
