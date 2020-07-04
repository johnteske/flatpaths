const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

app.get("/favicon.ico", function ignoreFavicon(req, res) {
  res.status(204);
});

app.get(
  "/:project?",
  function getProjects(req, res, next) {
    req.projects = [];
    fs.readdir(path.join(__dirname, "projects"), (err, projects) => {
      if (err != null) {
        return next(err);
      }
      req.projects = projects;
      next();
    });
  },
  function parseRequest(req, res, next) {
    req.errors = [];

    const { project } = req.params;
    req.project = project;
    req.projectExists = req.projects.includes(project);
    if (!req.projectExists) {
      req.errors.push(`project '${project}' not found`);
    }

    const { generate, scale = 1 } = req.query;
    req.shouldGenerate = req.projectExists && generate === "true";
    req.scale = scale;

    next();
  },
  // TODO the generate script could be modified to be called from node, not a child process
  function maybeGenerateSvg(req, res, next) {
    if (req.shouldGenerate) {
      require("child_process").execSync(`node generate.js -p ${req.project}`);
    }
    next();
  },
  function maybeGetSvg(req, res, next) {
    if (!req.projectExists) {
      return next();
    }
    try {
      req.svg = fs.readFileSync(
        path.join(__dirname, `projects/${req.project}/out.svg`)
      );
      req.hasSvg = true;
    } catch (err) {
      req.errors.push(`error loading svg`);
      req.hasSvg = false;
    }
    next();
  },
  function sendHtmlResponse(req, res) {
    res.send(`
<style>
  body { margin: 0; }
  header, main { padding: 1em; }
</style>
<header>
  <label for="project">Project</label>
  <select name="project" id="project" onchange="projectChangeHandler()">
    ${[req.project]
      // ^ start with current project so it is first in list (also adds in case it is not defined)
      .concat(req.projects)
      // deduplicate
      .filter((current, i, all) => all.indexOf(current) === i)
      .map(
        p =>
          `<option value="${p}" ${
            p === req.project ? "selected disabled" : ""
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
  ${req.errors.length === 0 ? req.svg : req.errors.join("\n")}
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
