const argv = require("minimist")(process.argv.slice(2));
const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

module.exports = function(project, cb) {
  if (project == null) {
    throw new Error("project not specified");
  }

  const projectPath = `./projects/${project}`;
  const file = path.resolve(`${projectPath}/out.svg`);
  const metadata = {
    project,
    file
  };

  const startTime = process.hrtime();

  paper.setup(new paper.Size(999, 999));

  delete require.cache[require.resolve(projectPath)];
  const generate = require(projectPath);
  // TODO this still relies on side-effects and globals
  if (typeof generate === "function") generate();

  metadata.paths = paper.project.getItems({ class: paper.Path }).length;

  const svg = paper.project.exportSVG({ asString: true });

  const endTime = process.hrtime(startTime);
  metadata.time = Math.round(endTime[1] / 100000);

  fs.writeFile(file, svg, function(err) {
    if (err) throw err;

    metadata.size = getFilesizeInKilobytes(file);

    cb(metadata);
  });
};

function getFilesizeInKilobytes(filename) {
  const { size } = fs.statSync(filename);
  return size / 1000;
}

if (require.main === module) {
  module.exports(argv.p, metadata => {
    console.info("Project: %s", metadata.project);
    console.info("Paths: %s", metadata.paths);
    console.info("Output: %s", metadata.file);
    console.info("File size: %dkB", metadata.size);
    console.info("Execution time: %dms", metadata.time);
  });
}
