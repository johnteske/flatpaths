const root = require("app-root-path");
const paper = require("paper-jsdom");

const { scale, translateY } = require(`${root}/transform`);

const cardinalToPoint = require("./cardinalToPoint");
const getGlyph = require("./glyphs");

paper.project.currentStyle = {
  strokeColor: "#000000"
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

const stringToGlyphs = str => str.split("").map(getGlyph);

const drawStringInGlyphs = (str, size = 32) =>
  stringToGlyphs(str).map(
    (glyph, i) =>
      // TODO use all glyphs in a single compound path
      new paper.CompoundPath(glyphToPath(glyph, i))
  ).map(
 scale(size, [0, 0]));

[
  drawStringInGlyphs("abcdefghij"),
  drawStringInGlyphs("klmnopqrst"),
  drawStringInGlyphs("uvwxyz"),
  drawStringInGlyphs("1234567890")
].map((row, i) => row.map(translateY(i * 32 * 2)));
