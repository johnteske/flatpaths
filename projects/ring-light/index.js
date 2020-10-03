const root = require("app-root-path");
const { inches, mm } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);
const polygon = require(`${root}/polygon`);
const { cut, guide } = require(`${root}/d3/stroke`);

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);
  const WIDTH = inches(1) + mm(3.3);

  const DIAMETER = inches(12);
  //const DIAMETER = inches(18);
  const RADIUS = DIAMETER / 2;

  const lineGenerator = d3.line();

  // circumcircle
  g.append("circle")
    .attr("r", RADIUS)
    .attr("cx", RADIUS)
    .attr("cy", RADIUS)
    .call(guide);
  g.append("line")
    .attr("x1", RADIUS)
    .attr("y1", RADIUS - T)
    .attr("x2", RADIUS)
    .attr("y2", RADIUS + T)
    .call(guide);
  g.append("line")
    .attr("x1", RADIUS - T)
    .attr("y1", RADIUS)
    .attr("x2", RADIUS + T)
    .attr("y2", RADIUS)
    .call(guide);

  const polyPoints = polygon.points(6, RADIUS);
  const polyPoints1 = polygon.points(6, RADIUS - WIDTH / 2);
  const polyPoints2 = polygon.points(6, RADIUS - WIDTH);

  g.append("path")
    .attr("d", lineGenerator(polyPoints) + "Z")
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(guide);
  g.append("path")
    .attr("d", lineGenerator(polyPoints2) + "Z")
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(guide);

  const aPoint = polyPoints1[polyPoints1.length - 2];
  // NOTE this is 3 sides of 7, not equal spacing across 6 sides
  const sideL = polygon.sideLengthFromRadius(6, RADIUS - WIDTH / 2);
  const sidePoints1 = nItems(4).map((_, i, arr) => [
    aPoint[0],
    aPoint[1] - (i * sideL) / arr.length
  ]);
  const sidePoints2 = sidePoints1.map(p => polygon.rotatePoint(p, 60));
  const sidePoints = [...sidePoints1.slice(1), ...sidePoints2];

  const ledPoints = [
    ...sidePoints,
    ...sidePoints.map(p => polygon.rotatePoint(p, 120)),
    ...sidePoints.map(p => polygon.rotatePoint(p, 240))
  ];

  g.selectAll(".led-holes")
    .data(ledPoints)
    .enter()
    .append("circle")
    .attr("r", mm(3.3))
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(guide);
};
