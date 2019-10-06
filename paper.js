const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const dpi = 96;

paper.setup(new paper.Size(999, 999));

const cut = o => {
  o.strokeColor = "#000000";
  return o;
};
const engrave = o => {
  o.strokeColor = "#0000ff";
  return o;
};

const point = (...args) => new paper.Point(...args);
const drawRect = (...args) => new paper.Path.Rectangle(...args);

const inches = n => n * dpi;
const mm = n => (n * dpi) / 25.4;

const caseHeight = mm(109);

const rect = new paper.Rectangle({
  width: mm(66),
  height: caseHeight
});
const r = drawRect(rect, mm(3));
cut(r);

const holeAt = center => new paper.Path.Circle({ center, radius: mm(1.5) });

const holes = new paper.Group(
  [[mm(3), mm(3)], [mm(3), caseHeight - mm(3)]].map(xy => holeAt(xy))
);
cut(holes);

const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;
  console.log("Saved!");
});
