const paper = require("paper-jsdom");

const cardinalToPoint = require("./cardinalToPoint");

const glyphs = {
  a: "swnn nnse"
};

const cardinalDyadToPoints = dyad => {
  const a = dyad.substr(0, 2);
  const b = dyad.substr(2);
  return [cardinalToPoint[a], cardinalToPoint[b]];
};

const drawGlyph = glyphData => {
  const pathData = glyphData
    .split(" ")
    .map(cardinalDyadToPoints)
    .map(v => `M${v[0]} L${v[1]}`)
    .join(" ");

  return new paper.CompoundPath(pathData);
};

const test = drawGlyph(glyphs.a);
test.scale(48, 48, [0, 0]);
test.strokeColor = "#000000";
