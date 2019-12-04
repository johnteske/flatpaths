const paper = require("paper-jsdom");

const group = (...args) => new paper.Group(...args);

module.exports = group;
