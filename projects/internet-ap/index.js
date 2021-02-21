const root = require("app-root-path");
const polygon = require(`${root}/lib/regular-polygon`);
const { inches } = require(`${root}/units`);
const { cut, guide } = require(`${root}/d3/stroke`);

const router = {
  baseID: inches(4 + 3 / 4),
  baseOD: inches(5.5)
};

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);
  // const WIDTH = inches(1) + mm(3.3);

  const rimT = inches(1.5); // TODO this is arbitrary
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
    .call(guide);

  // circumradius from inradius of RADIUS
  const apRadius = RADIUS / Math.cos(Math.PI / 6);
  const polyPoints0 = polygon.points(6, apRadius);
  const apCornerRadius = rimT / 2;
  const cornerRadiusPoints = g.append("g");
  cornerRadiusPoints
    .selectAll("circle")
    .data(polygon.points2(polyPoints0, apCornerRadius))
    .enter()
    .append("circle")
    .attr("r", T)
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)

    .call(guide);
  g.append("path")
    .attr("d", polygon.path(polyPoints0, apCornerRadius))
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(cut);

  // ziptie holes
  const ziptieHoles = g.append("g").call(cut);
  function ziptieHole(selection, deg, offset) {
    selection
      .append("circle")
      .attr("r", T)
      .attr("cx", RADIUS + offset)
      .attr("cy", RADIUS)
      .attr("transform", `rotate(${deg}, ${RADIUS}, ${RADIUS})`);
  }
  ziptieHoles.call(ziptieHole, 0, 0);
  for (let i = 0; i < 6; i++) {
    ziptieHoles.call(ziptieHole, i * 60, RADIUS / 3);
    ziptieHoles.call(ziptieHole, i * 60, (RADIUS * 2) / 3);
    ziptieHoles.call(ziptieHole, 30 + i * 60, (RADIUS * 2) / 3);
  }

  const sideW = polygon.sideLengthFromRadius(6, RADIUS) - apCornerRadius * 2;
  const sideH = inches(5 / 2);
  const sideTabL = sideW / 2;
  // side slots
  const sideSlots = g.append("g");
  function slot(selection, deg = 0) {
    selection
      .append("rect")
      .attr("width", T)
      .attr("height", sideTabL)
      .attr("x", OUTER_DIAMETER - rimT / 4 - T / 2)
      .attr("y", RADIUS - sideTabL / 2)
      .attr("transform", `rotate(${deg}, ${RADIUS}, ${RADIUS})`)
      .call(cut);
  }
  for (let i = 0; i < 6; i++) {
    sideSlots.call(slot, i * 60);
  }
  // side
  const sidePoints = [
    [0, 0],
    [sideW / 2 - sideTabL / 2, 0],
    [sideW / 2 - sideTabL / 2, -T],
    [sideW / 2 + sideTabL / 2, -T],
    [sideW / 2 + sideTabL / 2, 0],
    [sideW, 0],
    [sideW, sideH],
    [sideW / 2 + sideTabL / 2, sideH],
    // add a little extra foot
    [sideW / 2 + sideTabL / 2, sideH + T * 2],
    [sideW / 2 - sideTabL / 2, sideH + T * 2],
    [sideW / 2 - sideTabL / 2, sideH],
    [0, sideH]
  ];
  g.append("path")
    .attr(
      "d",
      sidePoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`) + "Z"
    )
    .attr("transform", `translate(${OUTER_DIAMETER + 2 * T}, ${T})`)
    .call(cut);
};
