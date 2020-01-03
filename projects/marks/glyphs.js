const glyphs = {
  a: "swee eese",
  b: "nwww eesw",
  c: "neww wwse",
  d: "neee wwse",
  e: "nwne wwee swse",
  f: "nenw wwee wwsw",
  g: "nenw swse seee",
  h: "nwsw wwee",
  i: "swww",
  j: "eese sesw",

  k: "nwww wwse",
  l: "wwsw swse",
  m: "swnw nwee eene",
  n: "swww wwse",
  o: "nwne swse swww neee",
  p: "wwsw nwee",
  q: "nwne swse swww neee wwse",
  r: "swww wwee",
  s: "eeww wwse sesw",
  t: "wwee eese",

  u: "wwsw seee swse",
  v: "wwsw swee",
  w: "nwsw swee eese",
  x: "nwse swne",
  y: "nwee eese",
  z: "wwee eesw swse",

  1: "wwne nese",
  2: "nwne eesw swse",
  3: "nwne neww wwse sesw",
  4: "neww eese",
  5: "nenw wwee eesw",
  6: "nenw wwse seee eeww",
  7: "wwee eesw",
  8: "nwne nwse swne swse",
  9: "nenw nwee eese",
  0: "nwne swse swnw nese nesw",

  NOT_FOUND: "nwne swse nwsw nese nwse nesw"
};

const getGlyph = c => glyphs[c] || glyphs.NOT_FOUND;

module.exports = getGlyph;
