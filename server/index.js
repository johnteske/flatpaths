const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

const htmlResponse = require("./html-response");

const projectsDir = path.join(__dirname, "../projects");
app.get("/favicon.ico", function ignoreFavicon(req, res) {
  res.status(204);
});

app.get(
  "/:project?",
  function getProjects(req, res, next) {
    req.projects = [];
    fs.readdir(projectsDir, (err, projects) => {
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
      req.errors.push({ message: `project '${project}' not found` });
    }

    const { generate, scale = 1 } = req.query;
    req.shouldGenerate = req.projectExists && generate === "true";
    req.scale = scale;

    next();
  },
  function maybeGenerateSvg(req, res, next) {
    if (!req.shouldGenerate) {
      return next();
    }
    require("child_process").exec(
      `node generate.js -p ${req.project}`,
      (err, stdout, stderr) => {
        if (err != null) {
          req.errors.push({ message: "error generating svg", body: stderr });
        }
        next();
      }
    );
  },
  function maybeGetSvg(req, res, next) {
    if (!req.projectExists) {
      return next();
    }
    try {
      req.svg = fs.readFileSync(
        path.join(projectsDir, `${req.project}/out.svg`)
      );
      req.hasSvg = true;
    } catch (err) {
      req.errors.push({ message: "error loading svg" });
      req.hasSvg = false;
    }
    next();
  },
  htmlResponse
);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
