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

//const point = (x, y) => new paper.Point(x, y);
const drawRect = (...args) => new paper.Path.Rectangle(...args);

const inches = n => n * dpi;
const mm = n => (n * dpi) / 25.4;

const rect = new paper.Rectangle({
  width: inches(3),
  height: inches(3)
});
const r = drawRect(rect, mm(3));
cut(r);

const cir = new paper.Path.Circle([inches(1.5), inches(1.5)], mm(3));
engrave(cir);

const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;
  console.log("Saved!");
});
