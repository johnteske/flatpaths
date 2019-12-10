const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const T = require("../material");
//const { supports } = require("../constructs/card-outer");

// TODO should reference construct

const part = layers =>
  path.rect({
    width: T + mm(0.2), // adjust for kerf
    height: T * layers,
    radius: mm(0.5)
  });

// could get points, not rendered supports
//module.exports = () => supports().map(() => part.clone());
module.exports = () => [part(4), part(4), part(5), part(5), part(5), part(5)];
