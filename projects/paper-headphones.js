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
const plateHeight = inches(2);
const [cx, cy] = [plateWidth, plateHeight].map(v => v * 0.5);

guide(new paper.Path.Line([0, cy], [plateWidth, cy]));
guide(new paper.Path.Line([cx, 0], [cx, plateHeight]));

const rect = new paper.Rectangle({
  width: plateWidth,
  height: plateHeight
});
cut(draw.rect(rect, mm(3)));
const radius = inches(3 / 16) * 0.5;
const holeAt = center => new paper.Path.Circle({ center, radius });

const mountingC2C = inches(3.5);
const mountFromCenter = mountingC2C / 2;
const holes = new paper.Group(
  [[cx - mountFromCenter, cy], [cx + mountFromCenter, cy]].map(xy => holeAt(xy))
);
cut(holes);

const mountFromCenter2 = mountingC2C / 4;
const holes2 = new paper.Group(
  [[cx - mountFromCenter2, cy], [cx + mountFromCenter2, cy]].map(xy =>
    holeAt(xy)
  )
);
cut(holes2);

const mountAt = center => new paper.Path.Circle({ center, radius: radius * 3 });
const mounts = [
  [cx - mountFromCenter2, inches(3)],
  [cx + mountFromCenter2, inches(3)]
];
const holes3 = new paper.Group(mounts.map(xy => mountAt(xy)));
mounts.map(xy => holes3.addChild(holeAt(xy)));
cut(holes3);

/////

function writeToFile(paper) {
  const svg = paper.project.exportSVG({ asString: true });

  fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

writeToFile(paper);
