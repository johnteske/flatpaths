const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const magSafe = {
  width: mm(6.5),
  height: mm(10.5),
  radius: mm(3.25)
};

const magSafeSupport = path.rect({
  width: mm(6.5),
  //width: magSafe.width,
  height: mm(50)
});

magSafe.y = magSafeSupport.height - magSafe.height - mm(2);

const magSafeCutout = path.rect(magSafe);

module.exports = {
  magSafe,
  magSafeSupport: () => magSafeSupport.clone(),
  magSafeCutout: () => magSafeCutout.clone()
};
