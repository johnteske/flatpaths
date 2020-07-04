const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

function getProjects() {
  return fs.readdirSync(path.join(__dirname, "projects"));
}

app.get(
  "/:project?",
  // parse request
  (req, res, next) => {
    const { project } = req.params;
    req.project = project;
    req.hasProject = project !== "";

    const { generate } = req.query;
    req.shouldGenerate = req.hasProject && generate === "true";

    next();
  },
  // generate if requested
  (req, res, next) => {
    if (req.shouldGenerate) {
      require("child_process").execSync(`node generate.js -p ${req.project}`);
    }
    next();
  },
  // get svg
  (req, res, next) => {
    try {
      req.svg = fs.readFileSync(
        path.join(__dirname, `projects/${req.project}/out.svg`)
      );
      req.hasSvg = true;
    } catch (err) {
      console.log(err);
      req.hasSvg = false;
    }
    next();
  },
  // response
  (req, res) => {
    res.send(`
<style>
  body { margin: 0; }
  header, main { padding: 1em; }
</style>
<header>
  <label for="project">Project</label>
  <select name="project" id="project" onchange="changeHandler()">
    ${getProjects().map(
      p =>
        `<option value="${p}" ${
          p === req.project ? "selected" : ""
        }>${p}</option>`
    )}
  </select>

  <label for="generate-on-load" >Generate on load</label>
  <input name="generate-on-load" id="generate-on-load" type="checkbox" ${
    req.shouldGenerate ? "checked" : ""
  } />
</header>
<main>
  ${req.hasSvg ? req.svg : "svg not found"}
</main>
<script>
  function changeHandler() {
    // indicate transition
    document.getElementsByTagName("main")[0].style.opacity = 0.1

    const { value: _path } = document.getElementById("project")
    const { checked: _generate } = document.getElementById("generate-on-load")
    window.location.href = _path + (_generate ? "?generate=" + _generate : "")
  }
</script>
`);
  }
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
