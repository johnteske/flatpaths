const root = require("app-root-path");
const { nItems } = require(`${root}/fn`);
const { inches, mm } = require(`${root}/units`);
const { cut, guide, stroke } = require(`${root}/d3/stroke`);

const alignmentGuide = stroke("#ff0000");

// 2x4
const T = inches(1.5);

// max dimensions
// 36" deep
// 7" tall
// ~24" wide

// 24" diagonal
const monitor = {
  width: inches(21),
  height: inches(12)
};

//monitor to top: 44"
//monitor to VESA top: 39"
const vesaMount = {
  margin: inches(1.5),
  boltPattern: mm(100)
};
vesaMount.width = vesaMount.margin + vesaMount.boltPattern + vesaMount.margin;
vesaMount.height = vesaMount.margin + vesaMount.boltPattern + vesaMount.margin;

const support = {
  width: inches(3.5),
  depth: T,
  height: inches(19.5)
};

const addSupport = (selection, x, y) =>
  selection
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", support.depth)
    .attr("height", support.height);

module.exports = function generate(d3, g) {
  // monitor
  g.append("rect")
    .attr("width", monitor.width)
    .attr("height", monitor.height)
    .call(guide);
  g.append("line")
    .attr("x1", monitor.width / 2)
    .attr("y1", 0)
    .attr("x2", monitor.width / 2)
    .attr("y2", monitor.height)
    .call(alignmentGuide);

  const mount = g.append("g").call(cut);
  mount
    .append("rect")
    .attr("width", vesaMount.width)
    .attr("height", vesaMount.height);
  mount
    .selectAll("mounting holes")
    .data([
      [0, 0],
      [vesaMount.boltPattern, 0],
      [vesaMount.boltPattern, vesaMount.boltPattern],
      [0, vesaMount.boltPattern]
    ])
    .enter()
    .append("circle")
    .attr("r", mm(4) / 2)
    .attr("cx", d => vesaMount.margin + d[0])
    .attr("cy", d => vesaMount.margin + d[1]);
  mount.attr(
    "transform",
    `translate(${(monitor.width - vesaMount.width) / 2}, ${(monitor.height -
      vesaMount.height) /
      2})`
  );

  const supports = g.append("g").call(guide);
  nItems(5).forEach((_, i, arr) => {
    const widths = arr.length * support.depth;
    const x0 = (monitor.width - widths) / 2;
    supports.call(addSupport, x0 + T * i, 0);
  });

  const supportsSide = g.append("g").call(cut);
  supportsSide
    .append("rect")
    .attr("width", support.width)
    .attr("height", support.height)
    .attr("x", inches(24));
};
