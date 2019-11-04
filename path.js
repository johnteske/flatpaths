const paper = require("paper-jsdom");

module.exports = {
  circle: (...args) => new paper.Path.Circle(...args),
  rect: (...args) => new paper.Path.Rectangle(...args)
};
