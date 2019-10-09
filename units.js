const dpi = 96;

const inches = n => n * dpi;
const mm = n => (n * dpi) / 25.4;

module.exports = {
  inches,
  mm
};
