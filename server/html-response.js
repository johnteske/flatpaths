module.exports = (req, res) => {
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
  } onclick="generateHandler()" />

  <label for="scale">Scale</label>
  <input name="scale" id="scale" type="number" step="any" value="${
    req.config.scale
  }" readonly />
  <button onclick="scaleHandler(0.5)">-</button>
  <button onclick="scaleHandler(2)">+</button>
</header>
<main>
  ${
    req.errors.length === 0
      ? req.svg
      : req.errors.map(
          err =>
            `<p>${err.message}</p>
    ${err.body != null ? `<pre>${err.body}</pre>` : ""}`
        )
  }
</main>
<script>
  let scale = ${req.config.scale}

  function projectChangeHandler() {
    // indicate transition
    document.getElementsByTagName("main")[0].style.opacity = 0.1

    const { value: _path } = document.getElementById("project")
    const { checked: _generate } = document.getElementById("generate-on-load")
    window.location.href = "/${
      req.params.projectType
    }/" + _path + (_generate ? "?generate=" + _generate : "")
  }

  function generateHandler() {
    const { checked: _generate } = document.getElementById("generate-on-load")
    setParam("generate", _generate, false)
  }

  function scaleHandler(factor) {
    document.querySelector("svg").setAttribute("width", "100%")
    document.querySelector("svg").setAttribute("height", "100%")
    scale *= factor
    // scale svg
    document.querySelector("svg g").setAttribute("transform", "scale(" + scale + ")")
    // scale stroke-width
    document.querySelector("svg g").setAttribute("stroke-width", 1 / scale)
    // update ui
    document.querySelector("#scale").value = scale
    // update query string
    setParam("scale", scale, 1)
  }

  // set scale on load
  scaleHandler(1)

  function setParam(key, value, _default) {
    var searchParams = new URLSearchParams(window.location.search)
    value !== _default ? searchParams.set(key, value) : searchParams.delete(key);
    var newRelativePathQuery = [window.location.pathname, searchParams.toString()].filter(Boolean).join("?");
    history.pushState(null, '', newRelativePathQuery);
        }
</script>
`);
};
