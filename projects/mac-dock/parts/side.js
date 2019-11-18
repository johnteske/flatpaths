const root = require("app-root-path");

const path = require(`${root}/path`);
//const { pipe } = require(`${root}/fn`);
//const { subtract } = require(`${root}/boolean`);
//
//const { T } = require("../material");
const { sideGeometry } = require("../constructs/tray2/bottom");
const { backGeometry } = require("../constructs/tray2/back");
const { withSlots } = require("../constructs/slot");
//const { slotGeometry, slot } = require("../constructs/slot");
//const {
//  tray,
//  back: backGeometry,
//  bottom: bottomGeometry
//} = require("../constructs/tray");
//

const bottom = path.rect(sideGeometry);
const back = path.rect(backGeometry);
const side = withSlots([], bottom.unite(back));
//const side = withSlots(path.rect(sideGeometry));

module.exports = {
  side: () => side.clone()
};
