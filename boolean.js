const subtract = cutout => target => target.subtract(cutout);
const unite = addition => target => target.unite(addition);

module.exports = {
  subtract,
  unite
};
