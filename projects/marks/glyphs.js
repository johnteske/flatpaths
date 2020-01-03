const glyphs = {
  a: "swne nese",
  b: "nwww eesw",
  c: "neww wwse",
  d: "neee wwse",
  e: "nwne eeww swse",
  f: "nenw eeww wwsw",
  g: "neww wwse seee",
  h: "nwsw wwse",
  i: "nwsw",
  j: "nese seww",
  k: "nwsw neww seww",
  l: "nwsw swse",

  6: "neww wwse seee eeww",

  NOT_FOUND: "nwne swse nwsw nese"
};

const getGlyph = c => glyphs[c] || glyphs.NOT_FOUND;

module.exports = getGlyph;
