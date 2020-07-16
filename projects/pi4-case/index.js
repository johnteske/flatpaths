const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut } = require(`${root}/stroke`);
const { mm } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

// https://www.raspberrypi.org/documentation/hardware/raspberrypi/mechanical/rpi_MECH_4b_4p0.pdf
const pi4 = {
  width: mm(85),
  length: mm(56),
  height: mm(16),
  radius: mm(3),
  overhang: mm(3) // amount some ports hang over PCB
};

const outer = path.rect({
  width: pi4.width + pi4.overhang * 2,
  height: pi4.length + pi4.overhang * 2,
  radius: pi4.radius
});

const heatSink = {
  width: mm(15),
  height: mm(15)
  // TODO how tall is heatSink, and how does it relate to case/standoff height?
};
// center
heatSink.x = mm(3.5) + mm(25.75) - heatSink.width;
heatSink.y = mm(32.5) - heatSink.height;

const heatSinkCutout = path.rect(heatSink).translate(pi4.overhang);
// TODO add clearance around heatsink
// TODO add stress relief corners

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
  .map(point => point.map(c => c + pi4.overhang + boltPattern.offset))
  .map(point => mountingHole.clone().translate(point));

const caseTop = mountingHoles
  .reduce((acc, hole) => acc.subtract(hole), outer.clone())
  .subtract(heatSinkCutout);

layoutRowsWithOffset([[caseTop.clone()].map(cut)], 10);
