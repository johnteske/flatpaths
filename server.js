const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

// ignore favicon
app.get("/favicon.ico", (req, res) => res.status(204));

app.get(
  "/:project?",
  // get projects
  (req, res, next) => {
    req.projects = [];
    fs.readdir(path.join(__dirname, "projects"), (err, projects) => {
      if (err != null) {
        next(err);
      }
      req.projects = projects;
      next();
    });
  },
  // parse request
  (req, res, next) => {
    req.__errors = [];

    const { project } = req.params;
    req.project = project;
    const hasProject = req.projects.includes(project);
    if (!hasProject) {
      req.__errors.push(`project '${project}' not found`);
    }

    const { generate, scale = 1 } = req.query;
    req.shouldGenerate = hasProject && generate === "true";
    req.scale = scale;

    next();
  },
  // generate if requested
  // TODO the generate script could be modified to be called from node, not a child process
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
  <select name="project" id="project" onchange="projectChangeHandler()">
    ${req.projects.map(
      p =>
        `<option value="${p}" ${
          p === req.project ? "selected" : ""
        }>${p}</option>`
    )}
  </select>

  <label for="generate-on-load">Generate on load</label>
  <input name="generate-on-load" id="generate-on-load" type="checkbox" ${
    req.shouldGenerate ? "checked" : ""
  } />

  <label for="scale">Scale</label>
  <input name="scale" id="scale" type="number" step="any" value="${
    req.scale
  }" readonly />
  <button onclick="scaleHandler(0.5)">-</button>
  <button onclick="scaleHandler(2)">+</button>
</header>
<main>
  ${req.__errors.length === 0 ? req.svg : req.__errors.join("\n")}
</main>
<script>
  let scale = ${req.scale}

  function projectChangeHandler() {
    // indicate transition
    document.getElementsByTagName("main")[0].style.opacity = 0.1

    const { value: _path } = document.getElementById("project")
    const { checked: _generate } = document.getElementById("generate-on-load")
    window.location.href = _path + (_generate ? "?generate=" + _generate : "")
  }

  function scaleHandler(factor) {
    scale *= factor
    // scale svg
    document.querySelector("svg g").setAttribute("transform", "scale(" + scale + ")")
    // scale stroke-width TODO this doesn't seem to be universal
    //document.querySelector("svg g g").setAttribute("stroke-width", 1 / scale)
    // update ui
    document.querySelector("#scale").value = scale
    // update query string
setParam("scale", scale)
    //const url = new URL('https://regexr.com')
  }
  // set scale on load
  scaleHandler(1)
  function setParam(key, value) {
    // TODO don't pass query param if scale is default (1)
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set("scale", scale);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
        }
</script>
`);
  }
);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
