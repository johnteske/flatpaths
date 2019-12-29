const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const nItems = length => Array.from({ length });

module.exports = {
  pipe,
  nItems
};
