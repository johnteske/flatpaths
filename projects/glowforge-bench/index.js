// v1 two side shelves, with top
// - two shelves for materials makes up the full bench width, so they should just be one unit
// - joining shelves in the middle to top cannot be done with the connectors (and mid support is needed)
// v2
// - one large shelf with divided shelves on bottom and a mid support on top

// TODO a reminder that nominal size !== actual size and that with kerf, parts will need to be smaller than the actual stock size

// connectors
// 1 2/3 in wide
const paper = require("paper-jsdom");
const root = require("app-root-path");

const { nItems } = require(`${root}/fn`);
const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
const group = require(`${root}/group`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const dimensions = {
  width: inches(36), // TODO is this enough room for the cutter base and connectors? // laser cutter full width is 38 in
  depth: inches(24), // inches(20.75), // 20.75-24 in
  height: inches(28)
};

const T = inches(3 / 4);

const kerf = inches(1 / 2); // TODO need to calculate

const CONNECTOR_GAP = inches(0.33); // from website

const benchTop = {
  width: dimensions.width + CONNECTOR_GAP + T + CONNECTOR_GAP,
  height: dimensions.depth
};
benchTop.part = path.rect(benchTop);

const topBack = {
  width: dimensions.width + CONNECTOR_GAP + T + CONNECTOR_GAP,
  height: dimensions.height / 2
};
topBack.part = path.rect(topBack);

const sidePanel = {
  width: dimensions.depth,
  height: dimensions.height / 2
};
sidePanel.part = path.rect(sidePanel);

const halfWidthPanel = {
  width: dimensions.width / 2,
  height: dimensions.height / 2
};
halfWidthPanel.part = path.rect(halfWidthPanel);

// TODO all this needs is enough room for the connectors, both for the shelf and for this support
const topSupport = { width: inches(12), height: dimensions.height / 2 };
topSupport.part = path.rect(topSupport);

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
          [
            [
              benchTop.part.clone(),
              ...nItems(5).map(() =>
                sidePanel.part
                  .clone()
                  .rotate(90, [0, 0])
                  .translate(sidePanel.height, 0)
              )
            ],
            [
              topBack.part.clone(),
              ...nItems(4).map(() =>
                halfWidthPanel.part
                  .clone()
                  .rotate(90, [0, 0])
                  .translate(halfWidthPanel.height, 0)
              ),
              topSupport.part.clone()
            ]
          ],
          kerf
        ).flat(),
        benchTop.part.clone()
      )
    ].map(guide),
    // parts
    [
      partGroup(topSupport.part, "top mid"),
      partGroup(sidePanel.part, "(5) side, btm mid"),
      partGroup(halfWidthPanel.part, "(4) top shelf, btm back")
    ],
    [partGroup(benchTop.part, "bench top"), partGroup(topBack.part, "top back")]
  ],
  inches(2)
);

paper.view.viewSize = [inches(48), inches(48)];
