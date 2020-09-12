const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

const pi4Outer = require("../pi4-case/constructs/outer").clone();
const router = require("./router")();
const powerStrip = require("./power-strip")();

const boardMargin = inches(1); // inches(1 / 2);

const pi4Rotation = 30;
const cat5Diameter = inches(5 / 16); // TODO approx
const cat5BendFactor = 4; // 6

const board = path.rect({
  width: inches(12),
  height: router.bounds.height + powerStrip.bounds.height + boardMargin * 3
  //height: inches(12) // up to 18
});

const label = (fontSize, fillColor) => (content, center) => {
  const text = new paper.PointText(center);
  text.fontSize = fontSize;
  text.justification = "center";
  text.content = content;
  text.fillColor = fillColor;
  text.translate(0, fontSize / 3);
  return text;
};

const componentLabel = label(inches(1), "#00ffff");

const connectionColor = "#ff00ff";

// TODO connections could have a type of x, y, label?, type? (usb, ac, etc)
const connectionPoint = (content, point) =>
  group(
    path.circle({ radius: mm(3), strokeColor: connectionColor }),
    label(inches(0.3), connectionColor)(content)
  ).translate(point);

// TODO this is linear, for now
const connection = (p1, p2) => {
  const line = new paper.Path.Line(p1, p2);
  line.strokeColor = connectionColor;
  return line;
};

// TODO
let routerPower;
let routerEthernetIn;
let routerEthernet1;
let routerEthernet2;
let routerEthernet3;
let routerEthernet4;
let ac;
let p1;
let p2;
let p3;
let p4;
let pi4Ethernet;
let pi4Power;

group(
  cut(board),
  // router
  group(
    guide(router),
    componentLabel("router", router.bounds.center),
    (routerPower = connectionPoint("power", router.data.connections.power)),
    (routerEthernetIn = connectionPoint(
      "ethernet in",
      router.data.connections.ethernetIn
    )),
    (routerEthernet1 = connectionPoint(
      "ethernet 1",
      router.data.connections.ethernet1
    )),
    (routerEthernet2 = connectionPoint(
      "ethernet 2",
      router.data.connections.ethernet2
    )),
    (routerEthernet3 = connectionPoint(
      "ethernet 3",
      router.data.connections.ethernet3
    )),
    (routerEthernet4 = connectionPoint(
      "ethernet 4",
      router.data.connections.ethernet4
    ))
  ).translate(boardMargin),
  // power strip
  group(
    guide(powerStrip),
    // TODO this is really just a score to mark the screw,
    //maybe it should be an x?
    cut(
      path
        .circle({
          radius: inches(1 / 4)
        })
        .translate(powerStrip.data.mounts[0])
    ),
    cut(
      path
        .circle({
          radius: inches(1 / 4)
        })
        .translate(powerStrip.data.mounts[1])
    ),
    componentLabel("power", powerStrip.bounds.center),
    (ac = connectionPoint("ac", powerStrip.data.connections.ac)),
    (p1 = connectionPoint("1", powerStrip.data.connections.plug1)),
    (p2 = connectionPoint("2", powerStrip.data.connections.plug2)),
    (p3 = connectionPoint("3", powerStrip.data.connections.plug3)),
    (p4 = connectionPoint("4", powerStrip.data.connections.plug4))
  ).translate(
    (board.bounds.width - powerStrip.bounds.width) / 2,
    board.bounds.height - boardMargin - powerStrip.bounds.height
  ),
  // pi4 NAS
  group(
    guide(pi4Outer),
    // connections
    (pi4Ethernet = connectionPoint(
      "ethernet",
      pi4Outer.data.connections.ethernet
    )),
    connectionPoint("usb", pi4Outer.data.connections.usb1),
    connectionPoint("usb", pi4Outer.data.connections.usb2),
    (pi4Power = connectionPoint("power", pi4Outer.data.connections.power)),
    componentLabel("pi4", pi4Outer.bounds.center)
  )
    .rotate(-90, [0, 0])
    .translate(0, pi4Outer.bounds.height) // after rotation, width is now height
    .translate(boardMargin)
    .translate(router.bounds.width, 0)
    .translate(cat5Diameter * cat5BendFactor * 2, cat5Diameter * cat5BendFactor) // two bends
    .rotate(pi4Rotation),
  // ethernet
  connection(routerEthernetIn.bounds.center, board.bounds.bottomLeft), // to modem
  connection(routerEthernet1.bounds.center, board.bounds.topCenter), // for laptop
  connection(routerEthernet2.bounds.center, board.bounds.topCenter), // for laptop
  connection(routerEthernet3.bounds.center, pi4Ethernet.bounds.center),
  // power
  connection(board.bounds.bottomLeft, p1.bounds.center), // to modem
  // skip p2, space needed between
  connection(routerPower.bounds.center, p3.bounds.center),
  connection(pi4Power.bounds.center, p4.bounds.center), // must be opposite of cord due to shape of adapter
  connection(ac.bounds.center, board.bounds.bottomRight), // to outlet
  componentLabel("coils", [
    board.bounds.width - boardMargin,
    board.bounds.height - boardMargin - powerStrip.bounds.height - boardMargin
  ]) // TODO placeholder for space to bundle excess cable
);

const cable = new paper.Path();
cable.strokeColor = "#ff0000";
cable.add(routerEthernet3.bounds.center);
cable.curveTo(
  [
    routerEthernet3.bounds.center.x + cat5Diameter * cat5BendFactor,
    routerEthernet3.bounds.center.y - cat5Diameter * cat5BendFactor
  ],
  [
    (pi4Ethernet.bounds.center.x - routerEthernet3.bounds.center.x) / 2 +
      routerEthernet3.bounds.center.x,
    (routerEthernet3.bounds.center.y - pi4Ethernet.bounds.center.y) / 2 +
      pi4Ethernet.bounds.center.y
  ]
);
cable.curveTo(
  [
    pi4Ethernet.bounds.center.x - cat5Diameter * cat5BendFactor,
    pi4Ethernet.bounds.center.y - cat5Diameter * cat5BendFactor
  ],
  pi4Ethernet.bounds.center
);

// power needs at least 2 inches as to not kink cable head
const cable2 = new paper.Path();
cable2.strokeColor = "#ff0000";
cable2.add(pi4Power.bounds.center);
cable2.lineTo([pi4Power.bounds.center.x + inches(2), pi4Power.bounds.center.y]);
cable2.rotate(pi4Rotation, pi4Power.bounds.center);
