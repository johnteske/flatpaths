const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);

const width = inches(7);
const height = inches(1 + 3 / 8);

const strip = path.rect({
  width,
  height
});

// TODO these are approx
const y = height / 2;
const connections = {
  ac: [0, y],
  plug1: [width - inches(4), y],
  plug2: [width - inches(3), y],
  plug3: [width - inches(2), y],
  plug4: [width - inches(1), y]
};

const _mounts = {
  spread: inches(2 + 1 / 4),
  x: width - inches(1 + 3 / 8),
  y
};
const mounts = [
  [_mounts.x, _mounts.y],
  [_mounts.x - _mounts.spread, _mounts.y]
];

strip.data = { connections, mounts };

module.exports = () => strip.clone();
