const root = require("app-root-path");

const { cut, guide } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const quickRelease = require("../palm-sandwich/constructs/quick-release");

const T = require("./material");
const receiver = require("./parts/receiver");

const guides = [
  // quick release, for reference
  quickRelease.b(),
  quickRelease.inner()
];

const cuts = [receiver.inner(), receiver.outer()];

layoutRowsWithOffset([cuts.map(cut), guides.map(guide)], T);
