const argv = require("minimist")(process.argv.slice(2));
const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

paper.setup(new paper.Size(999, 999));

require(`./projects/${argv.p}`);

const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;
  console.log("Saved!");
});
