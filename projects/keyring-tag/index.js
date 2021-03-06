const root = require("app-root-path");
const paper = require("paper-jsdom");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { engrave } = require(`${root}/fill`);
const { cut } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const sq = inches(3 / 4);
const slotWidth = inches(1 / 16);
const d = inches(1 / 16);

const tag = label => {
  return group(
    cut(
      path
        .rect({
          width: sq,
          height: sq,
          radius: d
        })
        .subtract(
          path.rect({
            radius: d,
            x: slotWidth,
            y: slotWidth,
            width: slotWidth,
            height: slotWidth // USB slot is 5/16 in tall
          })
        )
    ),

    (() => {
      const fontSize = 12;
      const textY = 3; // optical adjustment
      const text = new paper.PointText(sq / 2, sq / 2 + textY);
      text.fontFamily = "monospace";
      text.fontSize = fontSize;
      text.content = label.toUpperCase();
      text.justification = "center";
      return engrave(text);
    })()
  );
};

layoutRowsWithOffset([[tag("Manjaro")]]);
