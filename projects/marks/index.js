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
  const glyph = new paper.Path();
  const points = glyphData.split(" ").flatMap(cardinalDyadToPoints);
  glyph.add(...points);
  return glyph;
};

const test = drawGlyph(glyphs.a).scale(48, 48, [0, 0]);
test.strokeColor = "#000000";
