const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const draw = require("./draw");
const { cut, guide } = require("./stroke");
const { inches, mm } = require("./units");

paper.setup(new paper.Size(9999, 9999));

//////

const T = inches(1 / 8);

const plateWidth = inches(5);
const plateHeight = inches(4);
const [cx, cy] = [plateWidth, plateHeight].map(v => v * 0.5);

guide(new paper.Path.Line([0, cy], [plateWidth, cy]));
guide(new paper.Path.Line([cx, 0], [cx, plateHeight]));

const rect = new paper.Rectangle({
  width: plateWidth,
  height: plateHeight
});
cut(draw.rect(rect, mm(3)));
const radius = inches(3 / 8) * 0.5;
const holeAt = center => new paper.Path.Circle({ center, radius });

const mountingC2C = inches(3.5);
const mountFromCenter = mountingC2C / 2;
const holes = new paper.Group(
  [[cx - mountFromCenter, cy], [cx + mountFromCenter, cy]].map(xy => holeAt(xy))
);
cut(holes);

const makeSlot = () =>
  draw.rect({
    width: T,
    height: inches(2)
  });
[[cx - inches(1.75 / 2), cy], [cx + inches(1.75 / 2), cy]].forEach(([x, y]) => {
  const slot = makeSlot();
  slot.position.x = x;
  slot.position.y = y;
  cut(slot);
});

//////

function writeToFile(paper) {
  const svg = paper.project.exportSVG({ asString: true });

  fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

writeToFile(paper);
