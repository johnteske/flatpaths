const argv = require("minimist")(process.argv.slice(2));
const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

module.exports = function(project, cb) {
  const projectPath = `./projects/${project}`;
  const projectOutput = path.resolve(`${projectPath}/out.svg`);

  console.info("%s", projectPath);

  paper.setup(new paper.Size(999, 999));

  delete require.cache[require.resolve(projectPath)];
  const generate = require(projectPath);
  // TODO this still relies on side-effects and globals
  if (typeof generate === "function") generate();

  console.info(
    "Paths: %d",
    paper.project.getItems({ class: paper.Path }).length
  );
  const svg = paper.project.exportSVG({ asString: true });

  fs.writeFile(projectOutput, svg, function(err) {
    if (err) throw err;

    cb(projectOutput);
  });
};

function getFilesizeInKilobytes(filename) {
  const { size } = fs.statSync(filename);
  return size / 1000;
}

if (require.main === module) {
  const startTime = process.hrtime();

  if (argv.p == null) {
    throw new Error("project not specified");
  }
  module.exports(argv.p, projectOutput => {
    const endTime = process.hrtime(startTime);
    console.info("Execution time: %dms", Math.round(endTime[1] / 100000));
    console.info("File size: %dkB", getFilesizeInKilobytes(projectOutput));
    console.info("Output:, %s", projectOutput);
  });
}
