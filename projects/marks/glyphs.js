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
  o: "wwee swse swww seee",
  p: "wwsw nwee",
  q: "wwee swse swww seee wwse",
  r: "swww wwee",
  s: "eeww wwse sesw",
  t: "wwee eese",

  u: "wwsw seee swse",
  v: "wwsw swee",
  w: "nwsw swee eese",
  x: "wwse swee",
  y: "nwee eese",
  z: "wwee eesw swse",

  1: "wwne nese",
  2: "nwne eesw swse",
  3: "nwne neww wwse sesw",
  4: "neww eese",
  5: "nenw wwee eesw",
  6: "nwww wwse sesw",
  7: "wwee eesw",
  8: "wwee wwse swee swse",
  9: "nenw nwee eese",
  0: "wwee swse swww seee eesw",

  NOT_FOUND: "nwne swse nwsw nese nwse nesw"
};

const getGlyph = c => glyphs[c] || glyphs.NOT_FOUND;

module.exports = getGlyph;
