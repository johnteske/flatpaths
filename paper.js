const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const dpi = 96;

paper.setup(new paper.Size(999, 999));

//const point = (x, y) => new paper.Point(x, y);
const rect = o => new paper.Path.Rectangle(o);
const inches = n => n * dpi;

rect({
  width: inches(3),
  height: inches(3),
  strokeColor: "black"
});

const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;
  console.log("Saved!");
});
