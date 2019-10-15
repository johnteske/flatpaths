const paper = require("paper-jsdom");

const path = require("../../path");
const { cut, guide } = require("../../stroke");
const { inches, mm } = require("../../units");

const palm = require("./palm");
const cards = require("./cards");

const group = (...args) => new paper.Group(...args);

const T = inches(1 / 8); // thickness of main body material
// const T2 = // thickness of faceplate material
const cornerRadius = 0; // mm(3);

const pin = { d: mm(3) };
pin.r = pin.d / 2;
pin.h = T + pin.d + T; // total pin height, incl. padding

const palmPocket = new paper.Rectangle({
  width: palm.d1,
  height: palm.h,
  x: T,
  y: pin.h
});
const palmPocketGuide = guide(
  path.rect({ ...palmPocket, radius: cornerRadius })
);
const cutPalmPocket = () => cut(palmPocketGuide.clone());

const palmFace = new paper.Rectangle({
  width: T,
  height: palm.face.h,
  y: palmPocket.y + palm.face.y // TODO
});
const cutPalmFace = () => cut(path.rect({ ...palmFace }));
const palmCameraCutout = new paper.Rectangle({
  width: T,
  height: palm.camera.h,
  x: palmPocket.topRight.x,
  y: palmPocket.topRight.y + palm.camera.offset
});
const cameraCutoutGuide = guide(path.rect(palmCameraCutout, 0));

const rect = new paper.Rectangle({
  width: T + palm.d1 + T + cards.T,
  height: pin.h + palmPocket.height + pin.h
});
const rect2 = path.rect({ ...rect, radius: cornerRadius });

const cardPocket = new paper.Rectangle({
  width: cards.T,
  height: cards.h,
  x: rect.width - cards.T,
  y: pin.h // (rect.height - cards.h) / 2
});
const cardPocket2 = path.rect({ ...cardPocket, radius: 0 });

const outer = () => {
  const o = rect2.clone();
  //o.parent = paper.project.activeLayer;
  return cut(o);
};

const outerWithPocket = () => {
  const owp = rect2.clone().subtract(cardPocket2);
  //owp.parent = paper.project.activeLayer;
  return cut(owp);
};

const outerWithPocketAndFace = outerWithPocket().subtract(
  cutPalmPocket().unite(cutPalmFace())
);

const holeAt = center => new paper.Path.Circle({ center, radius: pin.r });
const holes = guide(
  group(
    [
      [rect.width / 2, T + pin.r],
      [rect.width / 2, rect.height - T - pin.r]
    ].map(xy => holeAt(xy))
  )
);
const cutHoles = () => cut(holes.clone());
// left edge
group([outer(), cutHoles()]).translate([100, 0]);

// left inner
group([outerWithPocket(), cutPalmPocket(), cutHoles()]).translate([200, 0]);

// phone face
group([outerWithPocketAndFace.clone(), cutHoles()]).translate([300, 0]);

// phone middle (charge port access)
// TODO this will also remove the bottom face hooks
group([
  outerWithPocketAndFace.clone().subtract(
    cut(
      path.rect(
        new paper.Rectangle({
          x: 0,
          y: rect.height,
          width: T + palm.d1,
          height: -rect.height / 2
        })
      )
    )
  ).subtract(
    cut(
      path.rect(
        new paper.Rectangle({
          x: 0,
          y: rect.height,
          width: rect.width,
          height: -pin.h
        })
      )
    )
   ),

  cutHoles()
]).translate([400, 0]);

// with camera
group([
  outerWithPocketAndFace.clone(),
  cut(cameraCutoutGuide.clone()),
  cutHoles()
]).translate([500, 0]);
