const paper = require("paper-jsdom");

module.exports = {
  rect: (...args) => new paper.Path.Rectangle(...args)
};
