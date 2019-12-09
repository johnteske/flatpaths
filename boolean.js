const divide = _ => target => target.divide(_);
const exclude = _ => target => target.exclude(_);
const intersect = _ => target => target.intersect(_);
const subtract = cutout => target => target.subtract(cutout);
const unite = addition => target => target.unite(addition);

module.exports = {
  divide,
  exclude,
  intersect,
  subtract,
  unite
};
