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
  depth: inches(20.75), // 20.75-24 in
  height: inches(36)
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

// need 6 per shelf
const shelfSide = {
  width: dimensions.depth,
  height: dimensions.height
};
shelfSide.part = path.rect({
  width: shelfSide.width,
  height: shelfSide.height / 2
});

// TODO need shelf back, which isn't square
// and inner shelf uses that width
// one per shelf
const shelfInner = {
  width: dimensions.depth,
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
    [
      shelfInner.part,
      shelfSide.part, // .rotate(90, [0,0]),
      benchTop.part
    ].map(cut)
  ],
  inches(3 / 4)
);

paper.view.viewSize = [inches(72), inches(72)];
