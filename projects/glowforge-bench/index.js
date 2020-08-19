// v1 two side shelves, with top
// - two shelves for materials makes up the full bench width, so they should just be one unit
// - joining shelves in the middle to top cannot be done with the connectors (and mid support is needed)
// v2
// - one large shelf with divided shelves on bottom and a mid support on top

// TODO a reminder that nominal size !== actual size and that with kerf, parts will need to be smaller than the actual stock size

const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const group = require(`${root}/group`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

// ignoring connector gaps
const dimensions = {
  width: inches(36),
  depth: inches(24), // inches(20.75), // 20.75-24 in
  height: inches(36)
};

const kerf = inches(1 / 2); // TODO need to calculate

const largePanel = {
  width: dimensions.width,
  height: dimensions.depth
};
largePanel.part = path.rect(largePanel);

const smallPanel = {
  width: dimensions.depth,
  height: dimensions.height / 2
};
smallPanel.part = path.rect(smallPanel);

// TODO get exact dimensions
const plywood = {
  width: inches(8 * 12),
  height: inches(4 * 12)
};
plywood.part = path.rect(plywood);

const fontSize = 96 * 2;

const label = label => {
  const text = new paper.PointText(0, -fontSize / 2);
  text.fontFamily = "monospace";
  text.fontSize = fontSize;
  text.content = label.toUpperCase();
  text.fillColor = "#0000ff";
  return text;
};

const partGroup = (part, text) =>
  group(cut(part.clone()), label(text)).translate(0, fontSize);

layoutRowsWithOffset(
  [
    // stock
    [
      group(
        plywood.part,
        // parts to cut
        // TODO this is a manual approach, not optimized
        ...layoutRowsWithOffset(
          [[largePanel.part.clone(), largePanel.part.clone()]],
          kerf
        ).flat(),
        largePanel.part.clone()
      )
    ].map(guide),
    // parts
    [
      partGroup(smallPanel.part, "(4) side"),
      partGroup(smallPanel.part, "(2) top shelf"),
      partGroup(smallPanel.part, "(1) top mid support"),
      partGroup(smallPanel.part, "(1) btm mid support"),
      partGroup(smallPanel.part, "(2) btm back")
    ],
    [
      partGroup(largePanel.part, "(1) bench top"),
      partGroup(largePanel.part, "(1) top back")
    ]
  ],
  inches(2)
);

paper.view.viewSize = [inches(48), inches(48)];
