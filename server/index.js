const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

const htmlResponse = require("./html-response");

const generatePaperJS = require("../generate");
const generateD3 = require("../generate-d3");

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
  function maybeGetConfig(req, res, next) {
    if (!req.shouldGenerate) {
      return next();
    }

    const configPath = path.join(req.projectDir, `${req.project}/config.json`);
    const defaultConfig = {
      lib: "paperjs"
    };
    let config = {};

    try {
      config = require(configPath);
    } catch {
      console.log(`${configPath} does not exist or is invalid, using defaults`);
    } finally {
      req.config = { ...defaultConfig, ...config };
      next();
    }
  },
  function maybeGenerateSvg(req, res, next) {
    if (!req.shouldGenerate) {
      return next();
    }

    switch (req.config.lib) {
      case "d3":
        generateD3(req.params.projectType, req.project, next);
        break;
      case "paperjs":
      default:
        generatePaperJS(req.params.projectType, req.project, metadata => {
          req.metadata = metadata;
          next();
        });
        break;
    }
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
