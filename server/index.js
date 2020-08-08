const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

const htmlResponse = require("./html-response");

const generate = require("../generate");

app.get("/favicon.ico", function ignoreFavicon(req, res) {
  return res.status(204);
});

function getProjects(req, res, next) {
  req.projects = [];
  fs.readdir(req.projectDir, (err, projects) => {
    if (err != null) {
      return next(err);
    }
    req.projects = projects;
    next();
  });
}

app.get(
  "/:projectType/:project?",
  function setProjectType(req, res, next) {
    const { projectType } = req.params;
    // TODO check projectType is project|construct
    if (projectType !== "project" && projectType !== "construct") {
      return next("nope " + projectType + typeof projectType);
    }
    req.projectDir = path.join(__dirname, `../${projectType}s`); // TODO plural
    next();
  },
  getProjects,
  function parseRequest(req, res, next) {
    req.errors = [];

    const { project } = req.params;
    req.project = project;
    req.projectExists = req.projects.includes(project);
    if (!req.projectExists) {
      req.errors.push({
        message: `${req.params.projectType} '${project}' not found`
      });
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
    generate(req.params.projectType, req.project, metadata => {
      req.metadata = metadata;
      next();
    });
  },
  function maybeGetSvg(req, res, next) {
    if (!req.projectExists) {
      return next();
    }
    try {
      req.svg = fs.readFileSync(
        path.join(req.projectDir, `${req.project}/out.svg`)
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
