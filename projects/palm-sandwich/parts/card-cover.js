const root = require("app-root-path");

const { subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { cardOuter, pins } = require("../constructs/card-outer");

const part = pipe(...pins().map(subtract))(cardOuter());

module.exports = () => {
  return part.clone();
};
