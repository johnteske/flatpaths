const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);

const pi4Outer = require("../pi4-case/constructs/outer").clone();

const router = require("./router")();
const powerStrip = require("./power-strip")();

const boardMargin = inches(1);

const board = path.rect({
  width: inches(12),
  height: inches(12) // up to 18
});

const cable = new paper.Path([[0, 0], [99, 66]]);

const label = (content, center) => {
  const text = new paper.PointText(center);
  text.fontSize = inches(1);
  text.justification = "center";
  text.content = content;
  text.fillColor = "#00ffff";
  text.translate(0, inches(0.333));
  return text;
};

group(
  cut(board),
  // router
  group(guide(router), label("router", router.bounds.center)).translate(
    boardMargin
  ),
  // power strip
  group(guide(powerStrip), label("power", powerStrip.bounds.center)).translate(
    (board.bounds.width - powerStrip.bounds.width) / 2,
    board.bounds.height - boardMargin - powerStrip.bounds.height
  ),
  // pi4 NAS
  group(guide(pi4Outer), label("pi4", pi4Outer.bounds.center)).translate(
    board.bounds.width - boardMargin - pi4Outer.bounds.width,
    boardMargin
  ),
  // TODO cable management
  guide(cable)
);
