const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

function getProjects() {
  return fs.readdirSync(path.join(__dirname, "projects"));
}

app.get("/:project?", (req, res) => {
  const { project } = req.params;

  // TODO (optionally) generate project before checking

  let svg;
  try {
    svg = fs.readFileSync(path.join(__dirname, `projects/${project}/out.svg`));
  } catch (err) {
    console.log(err);
  }

  res.send(`
<header>
  <label for="project">Project</label>
  <select name="project" id="project" onchange="changeHandler()">
    ${getProjects().map(
      p =>
        `<option value="${p}" ${p === project ? "selected" : ""}>${p}</option>`
    )}
  </select>
</header>
<main>
  ${svg !== undefined ? svg : "svg not found"}
</main>
<script>
  function changeHandler() {
    var select = document.getElementById("project")
    window.location.href = select.value
  }
</script>
`);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
