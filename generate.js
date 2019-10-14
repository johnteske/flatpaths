const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

paper.setup(new paper.Size(999, 999));

require("./projects/palm-slices");

const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;
  console.log("Saved!");
});
