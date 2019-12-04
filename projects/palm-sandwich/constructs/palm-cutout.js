const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const palm = require(`${root}/objects/palm`);

const cutout = path.rect({
  width: palm.w,
  height: palm.h,
  radius: mm(9) // TODO palm object does not have radius // palm.r
});

module.exports = () => {
  return cutout.clone();
};
