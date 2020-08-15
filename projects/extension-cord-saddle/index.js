// v1 bent acrylic (with heat gun)
// v2 finger joints

const root = require("app-root-path");

const path = require(`${root}/path`);
const { pipe, nItems } = require(`${root}/fn`);
const { cut } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { unite } = require(`${root}/boolean`);
const { translate } = require(`${root}/transform`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

const T = inches(1 / 8);
const N_FINGERS = 5;

const anchor = {
  shaftDiameter: inches(1 / 8) // TODO measure
};

const anchorHole = path.circle({ radius: anchor.shaftDiameter / 2 });

const saddleFoot = {
  width: inches(1),
  height: inches(1)
};

const finger = {
  width: T,
  height: saddleFoot.height / N_FINGERS
};
finger.part = path.rect(finger);

const withFingers = fingers => pipe(...fingers.map(s => unite(s)));

const fingers = mod =>
  nItems(N_FINGERS)
    .map((_, i) => finger.part.clone().translate(0, finger.height * i))
    .filter((_, i) => i % 2 === mod);

saddleFoot.part = withFingers(fingers(0).map(translate(saddleFoot.width, 0)))(
  path
    .rect(saddleFoot)
    .subtract(
      anchorHole.clone().translate(saddleFoot.width / 2, saddleFoot.height / 2)
    )
);

const cordConnector = {
  width: inches(1),
  height: inches(7 / 8)
};
cordConnector.partTop = withFingers(
  fingers(0).map(translate(cordConnector.width, 0))
)(
  withFingers(fingers(0).map(translate(-T, 0)))(
    path.rect({
      width: cordConnector.width,
      height: saddleFoot.height
    })
  )
);
cordConnector.partSide = withFingers(
  fingers(1).map(translate(cordConnector.height, 0))
)(
  withFingers(fingers(1).map(translate(-T, 0)))(
    path.rect({
      width: cordConnector.height,
      height: saddleFoot.height
    })
  )
);

layoutRowsWithOffset(
  [
    [
      saddleFoot.part.clone(),
      cordConnector.partSide.clone(),
      cordConnector.partTop.clone(),
      cordConnector.partSide.clone(),
      saddleFoot.part.clone()
    ].map(cut)
  ],
  3 * T
);
