const paper = require("paper-jsdom");
const path = require("path");
const fs = require("fs");

const p2 = {
  writeToFile: paper => {
    const svg = paper.project.exportSVG({ asString: true });

    fs.writeFile(path.resolve("./out.svg"), svg, function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }
};

module.exports = p2;
