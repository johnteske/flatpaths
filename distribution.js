const widths = paths => paths.map(p => p.internalBounds.width);

const xPositions = (widths, offset = 0) =>
  widths.reduce(
    ({ positions, x }, width) => {
      const _x = x + width + offset;
      return {
        positions: [...positions, x],
        x: _x
      };
    },
    { positions: [], x: 0 }
  ).positions;

const translateXWithOffset = (paths, offset) => {
  const x = xPositions(widths(paths), offset);
  return paths.map((p, i) => p.translate([x[i], 0]));
};

module.exports = {
  translateXWithOffset
};
