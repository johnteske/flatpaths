const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

paper.setup(new paper.Size(300, 600));

const point = (x, y) => new paper.Point(x, y);

var rect = new paper.Path.Rectangle({
  from: point(0, 0),
  to: point(96, 96),
  strokeColor: "black"
});

var svg = paper.project.exportSVG({ asString: true });
//console.log(svg);

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;
  console.log("Saved!");
});
