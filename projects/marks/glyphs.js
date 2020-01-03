const glyphs = {
  a: "swne nese",
  b: "nwww wwee eesw",
  c: "neww wwse",
  d: "neee eeww wwse",
  e: "neww eeww seww",
  f: "nenw eeww wwsw",
  g: "neww wwse seee",
  h: "nwsw wwse",
  i: "nwsw",
  j: "nese seww",
  6: "neww wwse seee eeww",
  NOT_FOUND: "nwne swse nwsw nese"
};

const getGlyph = c => glyphs[c] || glyphs.NOT_FOUND;

module.exports = getGlyph;
