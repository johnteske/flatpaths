const argv = require("minimist")(process.argv.slice(2));
const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const startTime = process.hrtime();

paper.setup(new paper.Size(999, 999));

require(`./projects/${argv.p}`);

const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
  if (err) throw err;

  console.log("Saved!");

  const endTime = process.hrtime(startTime);
  console.info("Execution time: %dms", Math.round(endTime[1] / 100000));
  console.info("File size: %dkB", getFilesizeInKilobytes(path.resolve("./out.svg")))
});

function getFilesizeInKilobytes(filename) {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats["size"]
  return fileSizeInBytes / 1000
}
