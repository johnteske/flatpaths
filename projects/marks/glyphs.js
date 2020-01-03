const glyphs = {
  a: "swne nese",
  b: "nwww eesw",
  c: "neww wwse",
  d: "neee wwse",
  e: "nwne wwee swse",
  f: "nenw wwee wwsw",
  g: "neww wwse seee",
  h: "nwsw wwee",
  i: "swnw",
  j: "nese sesw",

  k: "nwsw neww seww",
  l: "nwsw swse",
  m: "swnw nwee eene",
  n: "swnw nwse",
  o: "nwne swse swww neee",
  p: "wwsw nwee",
  q: "nwne swww neee nwse",
  r: "swww wwee",
  s: "nenw nwee eesw",
  t: "wwee nese",

  u: "wwsw seee swse",
  v: "nwsw swne",
  w: "nwsw swne neee",
  x: "nwse swne",
  y: "nwee eese",
  z: "nwne nesw swse",

  1: "wwne nese",
  2: "wwne neee eesw swse",
  3: "nwne neww wwse sesw",
  4: "neww eese",
  5: "nenw nwww wwee eesw",
  6: "neww wwse seee eeww",
  7: "wwee eesw", // full height
  //7: "nwne nesw", // half height
  8: "nwne nwse swne swse",
  9: "eenw nwne nesw",
  0: "nwne swse nwsw nese nesw",

  NOT_FOUND: "nwne swse nwsw nese nwse nesw"
};

const getGlyph = c => glyphs[c] || glyphs.NOT_FOUND;

module.exports = getGlyph;
