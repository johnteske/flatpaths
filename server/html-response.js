module.exports = (req, res) => {
  res.send(`
<head>
<title>${req.config.name} | flatpaths</title>
<style>
  * {
    margin: 0;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
  header, main { padding: 0.5em; }
  h1 {
    font-size: 1em;
  }
  nav {
    display: flex
  }
  nav #project {
    flex-grow: 1;
  }
  #scale-fields button {
    width: 2em;
  }
  #scale-fields input {
    flex-grow: 1;
  }
</style>
</head>
<body>
<header>
  <div>
    <h1>${req.config.name}</h1>
    <p>${req.config.description}</p>
  </div>
  <div>
  <nav>
  <label for="project">Project</label>
  <select name="project" id="project" onchange="projectChangeHandler()">
    ${[...req.projects, undefined].map(
      p =>
        `<option value="${p}" ${
          p === req.project ? "selected disabled" : ""
        }>${p}</option>`
    )}
  </select><br />
  </nav>
  <fieldset>
  <legend><button>Generate</button></legend>
  <label for="generate-on-load">Generate on load</label>
  <input name="generate-on-load" id="generate-on-load" type="checkbox" ${
    req.shouldGenerate ? "checked" : ""
  } onclick="generateHandler()" />
  </fieldset>

  <fieldset id="scale-fields">
  <legend>Scale</legend>
  <!--label for="scale">Scale</label-->
  <input name="scale" id="scale" type="number" step="any" value="${
    req.config.scale
  }" disabled />
  <button onclick="scaleHandler(0.5)">-</button>
  <button onclick="scaleHandler(2)">+</button>
  </fieldset>
  </div>
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
</body>
`);
};
