const paper = require("paper-jsdom");

const path = require("../../path");
const { cut, engrave, guide } = require("../../stroke");
const { inches, mm } = require("../../units");
const score = engrave;

const palm = require("./palm");
const cards = require("./cards");

const group = (...args) => new paper.Group(...args);

const T = inches(1 / 8); // thickness of main body material
const T2 = inches(1 / 8); // thickness of faceplate material
const cornerRadius = T;

const pin = { d: mm(3) };
pin.r = pin.d / 2;
pin.h = T + T + T; // total pin height, incl. padding
//pin.h = T + pin.d + T; // total pin height, incl. padding

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
// add material for radius
palmFace.height += cornerRadius * 2;
palmFace.y -= cornerRadius;
const palmFaceGuide = guide(
  path
    .rect({ ...palmFace })
    .subtract(
      new paper.Path.Circle({
        center: [T / 2, palmFace.y],
        radius: palmFace.width / 2
      })
    )
    .subtract(
      new paper.Path.Circle({
        center: [T / 2, palmFace.y + palmFace.height],
        radius: T / 2
      })
    )
);
const cutPalmFace = () => cut(palmFaceGuide.clone());

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

const facePlateTab = path.rect({
  ...new paper.Rectangle({
    x: rect.width,
    y: pin.h,
    width: T2,
    height: (rect.height - pin.h - pin.h - cards.h) / 2
  })
});
guide(facePlateTab);

const cardPocket = new paper.Rectangle({
  width: cards.T,
  height: cards.h,
  x: rect.width - cards.T,
  y: (rect.height - cards.h) / 2
});
const cardPocket2 = guide(path.rect({ ...cardPocket, radius: 0 }));

const outer = () => {
  const o = rect2.clone();
  return cut(o);
};

const button = (() => {
  const padding = (palm.d1 - palm.button.w) / 2;
  const halfWidth = palm.button.w / 2 + padding;
  const points = [
    [-halfWidth, palm.button.h + padding],
    [-halfWidth, -padding],
    [halfWidth, -padding],
    [halfWidth, palm.button.h + padding]
  ];
  const cutout = new paper.Path(points);
  const stressRelief = points.map(
    xy => new paper.Path.Circle({ center: xy, radius: mm(0.75) })
  ); // 0.2mm is kerf?
  return guide(group([cutout, ...stressRelief])).translate([
    palmPocket.x + palmPocket.width / 2,
    palmPocket.y + palm.button.y
  ]);
})();

const cutButton = () => cut(button.clone());

const outerWithPocket = () => {
  const owp = rect2
    .clone()
    .unite(facePlateTab.clone())
    .unite(
      facePlateTab
        .clone()
        .translate([0, cardPocket.height + facePlateTab.height])
    )
    .subtract(cardPocket2);
  return cut(owp);
};

const outerWithPocketAndFace = outerWithPocket().subtract(
  cutPalmPocket().unite(cutPalmFace())
);

const guideHolePoints = [
  [rect.width / 2, T + pin.r],
  [rect.width / 2, rect.height - T - pin.r]
];
const guideHoles = guide(
  group(
    guideHolePoints.map(
      ([x, y]) =>
        new paper.Path.Rectangle({
          x: x - T,
          y: y - T / 2,
          width: T * 2,
          height: T
        })
      // xy => new paper.Path.Circle({ center: xy, radius: pin.r })
    )
  )
);
const cutHoles = () => cut(guideHoles.clone());

const materialPin = new paper.Path.Rectangle({
  x: 0,
  y: rect.height + T,
  width: 20 * T,
  height: T * 2
});
cut(materialPin);
cut(materialPin.clone().translate([0, T * 3]));

const sliceLabel = guide(
  new paper.Path(
    [0, T / 2 + pin.r].map(yOff => {
      const [x, y] = guideHolePoints[0];
      return [x, y - yOff];
    })
  )
);

const scoreSliceLabel = n => {
  const g = group();
  const spread = 360 / n;
  for (let i = 0; i < n; i++) {
    g.addChild(sliceLabel.clone().rotate(i * spread, guideHolePoints[0]));
  }
  return score(g);
};

// edge
// 2 slices
group([
  scoreSliceLabel(1),
  outer(),
  palmPocketGuide.clone(),
  cutButton(),
  cutHoles()
]).translate([100, 0]);

// inner edge
// 2 slices
group([
  scoreSliceLabel(2),
  outerWithPocket(),
  cutPalmPocket(),
  cutHoles()
]).translate([200, 0]);

// phone face
// 5
group([
  scoreSliceLabel(3),
  outerWithPocketAndFace.clone(),
  cutHoles()
]).translate([300, 0]);

// phone middle (charge port access)
// 6 slices
group([
  scoreSliceLabel(4),
  outerWithPocketAndFace
    .clone()
    .subtract(
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
    )
    .subtract(
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

  cutHoles().children[0]
]).translate([400, 0]);

// with camera
// 5 slices
// TODO one needs space for charge port
group([
  scoreSliceLabel(5),
  outerWithPocketAndFace.clone().subtract(cut(cameraCutoutGuide.clone())),
  cutHoles()
]).translate([500, 0]);
