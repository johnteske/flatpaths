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
const cornerRadius = 0; // mm(3);

const pin = { d: mm(3) }
pin.r = pin.d / 2;
pin.h = T + pin.d + T; // total pin height, incl. padding

const palm = {
  w: mm(51),
  h: mm(96),
  d1: mm(7.5), // body
  d2: mm(8.1) // camera
};

const cards = {
  w: mm(54),
  h: mm(86),
  T: mm(1.75) // thickness both cards, stacked = 1.65 mm, with wiggle
}

const inner = new paper.Rectangle({
  width: palm.d1,
  height: palm.h,
  x: T,
  y: pin.h
});
cut(draw.rect(inner, 0));

const rect = new paper.Rectangle({
  width: T + inner.width + T + cards.T,
  height: pin.h + inner.height + pin.h
});
const rect2 = draw.rect(rect, cornerRadius);

const cardPocket = new paper.Rectangle({
  width: cards.T,
  height: cards.h,
  x: rect.width - cards.T,
  y: pin.h
});
const cardPocket2 = draw.rect(cardPocket, 0);

const outerWithPocket = rect2.subtract(cardPocket2);
cut(outerWithPocket)

const holeAt = center => new paper.Path.Circle({ center, radius: pin.r });
const holes = new paper.Group(
  [[rect.width / 2, T + pin.r], [rect.width / 2, rect.height - T - pin.r]].map(xy => holeAt(xy))
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
