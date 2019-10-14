const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const draw = require("./draw");
const { cut } = require("./stroke");
const { inches, mm } = require("./units");

paper.setup(new paper.Size(9999, 9999));

//////

const T = inches(1 / 8); // thickness of main body material
// const T2 = // thickness of faceplate material
const cornerRadius = mm(3);

const primitives = new paper.Group({ insert: false });

const pin = { d: mm(3) };
pin.r = pin.d / 2;
pin.h = T + pin.d + T; // total pin height, incl. padding

const palm = {
  w: mm(51),
  h: mm(96.5),
  d1: mm(7.5), // body
  d2: mm(8.1), // body at camera
  camera: {
    w: mm(11),
    h: mm(19),
    offset: mm(5) // offset both x and y from edge
  }
};

const cards = {
  w: mm(54),
  h: mm(86),
  T: mm(1.75) // thickness both cards, stacked = 1.65 mm, with wiggle
};

const palmPocket = new paper.Rectangle({
  width: palm.d1,
  height: palm.h,
  x: T,
  y: pin.h
});
cut(draw.rect({ ...palmPocket, radius: cornerRadius}));

//const palmCameraCutout = new paper.Rectangle({
//  width: T,
//  height: palm.camera.h
//});
//palmCameraCutout.x = palmPocket.topRight.x;
//palmCameraCutout.y = palmPocket.topRight.y + palm.camera.offset;
//cut(draw.rect(palmCameraCutout, 0));

const rect = new paper.Rectangle({
  width: T + palm.d1 + T + cards.T,
  height: pin.h + palmPocket.height + pin.h
});
const rect2 = draw.rect({ ...rect, radius: cornerRadius, parent: primitives });

const cardPocket = new paper.Rectangle({
  width: cards.T,
  height: cards.h,
  x: rect.width - cards.T,
  y: pin.h
});
const cardPocket2 = draw.rect({ ...cardPocket, radius: 0, parent: primitives});

const outerWithPocket = rect2.subtract(cardPocket2);
outerWithPocket.parent = paper.project.activeLayer;
cut(outerWithPocket);

const holeAt = center => new paper.Path.Circle({ center, radius: pin.r });
const holes = new paper.Group(
  [[rect.width / 2, T + pin.r], [rect.width / 2, rect.height - T - pin.r]].map(
    xy => holeAt(xy)
  )
);
cut(holes);

/////

function writeToFile(paper) {
  const svg = paper.project.exportSVG({ asString: true });

  fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

writeToFile(paper);
