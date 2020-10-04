const root = require("app-root-path");
const { inches, mm } = require(`${root}/units`);
const { nItems } = require(`${root}/fn`);
const polygon = require(`${root}/lib/regular-polygon`);
const point = require(`${root}/lib/point`);
const { cut, guide } = require(`${root}/d3/stroke`);

//led spread = 2.2mm
// min resistor spread ~10mm

module.exports = function generate(d3, g) {
  const T = inches(1 / 8);
  const WIDTH = inches(1) + mm(3.3);

  const OUTER_DIAMETER = inches(12);
  const RADIUS = OUTER_DIAMETER / 2;

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

  // outer
  g.append("path")
    .attr("d", polygon.path(polyPoints, 0))
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(guide);
  g.append("path")
    .attr("d", polygon.path(polyPoints, mm(3.3)))
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(cut);
  // inner
  g.append("path")
    .attr("d", polygon.path(polyPoints2, 0))
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(guide);
  g.append("path")
    .attr("d", polygon.path(polyPoints2, mm(3.3)))
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`)
    .call(cut);

  const aPoint = polyPoints1[polyPoints1.length - 2];
  // NOTE this is 3 sides of 7, not equal spacing across 6 sides
  const sideL = polygon.sideLengthFromRadius(6, RADIUS - WIDTH / 2);
  const sidePoints1 = nItems(4).map((_, i, arr) => [
    aPoint[0],
    aPoint[1] - (i * sideL) / arr.length
  ]);
  const sidePoints2 = sidePoints1.map(p => point.rotate(60)(p));
  const sidePoints = [...sidePoints1.slice(1), ...sidePoints2];

  const ledPoints = [
    ...sidePoints,
    ...sidePoints.map(p => point.rotate(120)(p)),
    ...sidePoints.map(p => point.rotate(240)(p))
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

  const th = nItems(6)
    .map((_, i) => {
      const [x, y] = point.rotate(60 * i)([0, RADIUS - WIDTH / 2]);
      return {
        x,
        y,
        rotation: 60 * i
      };
    })

    .concat(sidePoints1.map(([x, y]) => ({ x, y, rotation: 90 })));

  const holeGroup = g
    .append("g")
    .attr("transform", `translate(${RADIUS}, ${RADIUS})`);

  holeGroup
    .selectAll(".through-hole-group")
    .data(th)
    .enter()
    .append("g")
    .attr("transform", d => `rotate(${d.rotation} ${d.x} ${d.y})`)
    .call(cut)
    .each(function(d) {
      const g = d3.select(this);
      g.append("circle")
        .attr("r", mm(0.5))
        .attr("cx", d.x)
        .attr("cy", d.y - mm(1.1));
      g.append("circle")
        .attr("r", mm(0.5))
        .attr("cx", d.x)
        .attr("cy", d.y + mm(1.1));
    });
};
