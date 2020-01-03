const paper = require("paper-jsdom");

const cardinalToPoint = require("./cardinalToPoint");

paper.project.currentStyle = {
  strokeColor: "#000000"
};

const glyphs = {
  a: "swnn nnse",
  b: "nwww wwee eesw",
  c: "neww wwse"
};

const cardinalDyadToPointDyad = dyad => {
  const a = dyad.substr(0, 2);
  const b = dyad.substr(2);
  return [cardinalToPoint[a], cardinalToPoint[b]];
};

const glyphToPath = (glyphData, i = 0, tracking = 1.5) =>
  glyphData
    .split(" ")
    .map(cardinalDyadToPointDyad)
    .map(([p1, p2]) => [
      [p1[0] + i * tracking, p1[1]],
      [p2[0] + i * tracking, p2[1]]
    ]) // transpose by character
    .map(v => `M${v[0]} L${v[1]}`)
    .join(" ");

"abc"
  .split("")
  .map(c => glyphs[c])
  .map((glyph, i) =>
    // TODO use all glyphs in a single compound path
    new paper.CompoundPath(glyphToPath(glyph, i)).scale(48, 48, [0, 0])
  );
