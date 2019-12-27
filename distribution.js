const widths = paths => paths.map(p => p.internalBounds.width);
const heights = paths => paths.map(p => p.internalBounds.height);

const max = items => items.sort((a, b) => a - b).pop();

// const maxWidth = items => max(widths(items));
const maxHeight = items => max(heights(items));

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

const layoutRowsWithOffset = (rows, offset) => {
  let y = 0;
  return rows.map(row => {
    const translated = translateXWithOffset(row, offset).map(item =>
      item.translate([0, y])
    );
    y += maxHeight(translated) + offset;
    return translated;
  });
};

module.exports = {
  translateXWithOffset,
  layoutRowsWithOffset
};
