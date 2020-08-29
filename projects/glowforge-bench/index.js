// TODO a reminder that nominal size !== actual size and that with kerf, parts will need to be smaller than the actual stock size
const paper = require("paper-jsdom");
const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut, guide } = require(`${root}/stroke`);
//const { fillColor } = require(`${root}/fill`);
const group = require(`${root}/group`);
const { translate } = require(`${root}/transform`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

// ignoring connector gaps
const dimensions = {
  width: inches(36),
  depth: inches(20.75), // 20.75-24 in // TODO still need to think on this
  height: inches(30)
};

const kerf = inches(1 / 2); // TODO need to calculate
const sawCut = length =>
  path.rect({
    height: kerf,
    width: length
  });

const benchTop = {
  width: dimensions.width,
  height: dimensions.depth
};
benchTop.part = path.rect({
  width: benchTop.width,
  height: benchTop.height
});

// need 4 per shelf
const shelfSide = {
  width: dimensions.depth,
  height: dimensions.height / 2
};
shelfSide.part = path.rect({
  // dimensions are flipped to help understand visually
  width: shelfSide.height,
  height: shelfSide.width
});

// 2 per shelf
const shelfBack = {
  width: inches(12),
  height: dimensions.height / 2
};
shelfBack.part = path.rect({
  width: shelfBack.width,
  height: shelfBack.height
});

// one per shelf
const shelfInner = {
  width: shelfBack.width,
  height: dimensions.depth
};
shelfInner.part = path.rect({
  width: shelfInner.width,
  height: shelfInner.height
});

const ply2x4 = {
  width: inches(23.8125),
  height: inches(47.8125),
  part: path.rect({
    width: inches(23.8125),
    height: inches(47.8125)
  })
};

const label = label => {
  const fontSize = 96;
  const text = new paper.PointText();
  text.fontFamily = "monospace";
  text.fontSize = fontSize;
  text.content = label.toUpperCase();
  //text.justification = "center";
  return text;
};

layoutRowsWithOffset(
  [
    // stock
    [
      // 2x4 ft
      // https://www.lowes.com/pd/3-4-in-Common-Fir-Sanded-Plywood-Application-as-2-x-4/1000068963
      group(
        ply2x4.part,
        // parts to cut
        benchTop.part
          .clone()
          .rotate(90, [0, 0])
          .translate(benchTop.height, 0),
        translate(0, benchTop.width)(sawCut(ply2x4.width))
      )
    ].map(guide),
    // parts
    [shelfInner.part, shelfBack.part, shelfSide.part, benchTop.part].map(cut),
    // labels
    [label("inner")].map(guide)
  ],
  inches(3 / 4)
);

paper.view.viewSize = [inches(72), inches(72)];
