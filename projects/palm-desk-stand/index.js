const root = require("app-root-path");

const { guide } = require(`${root}/stroke`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const quickRelease = require("../palm-sandwich/constructs/quick-release");

const T = require("./material");

const guides = [
  // quick release, for reference
  quickRelease.inner(),
];

layoutRowsWithOffset(
  [
    guides.map(guide)
  ],
  T
);
