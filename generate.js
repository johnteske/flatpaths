const argv = require("minimist")(process.argv.slice(2));
const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const startTime = process.hrtime();
const projectPath = `./projects/${argv.p}`;
const projectOutput = path.resolve(`${projectPath}/out.svg`);

console.info("%s", projectPath);

paper.setup(new paper.Size(999, 999));

require(projectPath);

console.info("Paths: %d", paper.project.getItems({ class: paper.Path }).length);
const svg = paper.project.exportSVG({ asString: true });

fs.writeFile(projectOutput, svg, function(err) {
  if (err) throw err;

  const endTime = process.hrtime(startTime);
  console.info("Execution time: %dms", Math.round(endTime[1] / 100000));
  console.info("File size: %dkB", getFilesizeInKilobytes(projectOutput));
});

function getFilesizeInKilobytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes / 1000;
}
