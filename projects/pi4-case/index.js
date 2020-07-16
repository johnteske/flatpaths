// https://www.raspberrypi.org/documentation/hardware/raspberrypi/mechanical/rpi_MECH_4b_4p0.pdf

const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const pi4 = {
  width: mm(85),
  _length: mm(56),
  height: mm(16),
  radius: mm(3),
  _overhang: mm(3) // amount some ports hang over PCB
};

const outer = path.rect({
  width: pi4.width + pi4._overhang * 2,
  height: pi4._length + pi4._overhang * 2,
  radius: pi4.radius
});

const heatSink = {
  width: mm(15), // + pi4.overhang,
  height: mm(15), // + pi4.overhang
  _center: { x: mm(3.5) + mm(25.75), y: mm(32.5) },
  _clearance: pi4._overhang
  // TODO how tall is heatSink, and how does it relate to case/standoff height?
};

// center
heatSink.x = heatSink._center.x - heatSink.width + pi4._overhang;
heatSink.y = heatSink._center.y - heatSink.height + pi4._overhang;

const _heatSinkCutout = path
  .rect({
    ...heatSink,
    width: heatSink.width + heatSink._clearance,
    height: heatSink.height + heatSink._clearance
  })
  .translate(heatSink._clearance / -2);

const heatSinkCutoutWithRelief = [
  _heatSinkCutout.bounds.topLeft,
  _heatSinkCutout.bounds.topRight,
  _heatSinkCutout.bounds.bottomLeft,
  _heatSinkCutout.bounds.bottomRight
].reduce(
  (acc, point) =>
    acc.unite(
      path
        .circle({
          radius: mm(1)
        })
        .translate(point)
    ),
  _heatSinkCutout
);

const boltPattern = {
  width: mm(58),
  height: mm(49),
  radius: mm(2.7) / 2,
  offset: mm(3.5) // x, y from edge
};
const mountingHole = path.circle({ radius: boltPattern.radius });
const mountingHoles = [
  [0, 0],
  [boltPattern.width, 0],
  [0, boltPattern.height],
  [boltPattern.width, boltPattern.height]
]
  .map(point => point.map(c => c + pi4._overhang + boltPattern.offset))
  .map(point => mountingHole.clone().translate(point));

const caseTop = mountingHoles
  .reduce((acc, hole) => acc.subtract(hole), outer.clone())
  .subtract(heatSinkCutoutWithRelief);

layoutRowsWithOffset(
  [[group(cut(caseTop.clone()), guide(path.rect(heatSink)))]],
  10
);
