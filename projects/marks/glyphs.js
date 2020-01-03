const glyphs = {
  a: "swne nese",
  b: "nwww wwee eesw",
  c: "neww wwse",
  d: "neee eeww wwse",
  NOT_FOUND: "nwne swse nwsw nese"
};

const getGlyph = c => glyphs[c] || glyphs.NOT_FOUND;

module.exports = getGlyph;
