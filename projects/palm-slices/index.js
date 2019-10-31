const paper = require("paper-jsdom");

const path = require("../../path");
const withRoundedCorner = require("../../rounded-corner");
const { cut, engrave, guide } = require("../../stroke");
const { inches, mm } = require("../../units");
const score = engrave;

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const palm = require("./palm");
const cards = require("./cards");

const group = (...args) => new paper.Group(...args);

const T = inches(1 / 8); // thickness of main body material
const T2 = inches(1 / 8); // thickness of faceplate material
const cornerRadius = T;
const softCornerRadius = mm(0.5); // just enough to soften

const pin = require("./pin")(T);

const palmPocket = new paper.Rectangle({
  width: palm.d1,
  height: palm.h,
  x: T,
  y: pin.outer.height
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

const palmFaceGuide = guide(path.rect({ ...palmFace }));
const cutPalmFace = () => cut(palmFaceGuide.clone());

const palmFaceWithRoundedCorners = target =>
  pipe(
    withRoundedCorner([T, palmFace.y + palmFace.height + T], T, "nw"),
    withRoundedCorner([T, palmFace.y - T], T, "sw")
  )(target);

const palmCameraCutout = new paper.Rectangle({
  width: T,
  height: palm.camera.h,
  x: palmPocket.topRight.x,
  y: palmPocket.topRight.y + palm.camera.offset
});
const cameraCutoutGuide = guide(path.rect(palmCameraCutout, 0));

const rect = new paper.Rectangle({
  width: T + palm.d1 + T + cards.T,
  height: pin.outer.height + palmPocket.height + pin.outer.height
});
const rect2 = path.rect({ ...rect, radius: cornerRadius });

const facePlateTab = path
  .rect({
    x: rect.width,
    width: T2 + T,
    height: T // (rect.height - pin.outer.height * 2 - cards.h) / 2
  })
  .unite(
    path.rect({
      x: rect.width + T2,
      width: T,
      height: T * 2
    })
  );
guide(facePlateTab);
const withFacePlateTabs = target =>
  target
    .unite(facePlateTab.clone().translate([0, 2 * T]))
    .unite(facePlateTab.clone().translate([0, rect.height - T - T - T - T]));

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
  const owp = rect2.clone().subtract(cardPocket2);
  return cut(owp);
};

const outerWithPocketAndFace = palmFaceWithRoundedCorners(
  outerWithPocket().subtract(cutPalmPocket().unite(cutPalmFace()))
);

const guideHolePoints = [
  [rect.width / 2 - pin.width / 2, T],
  [rect.width / 2 - pin.width / 2, rect.height - T - pin.height]
];
const guideHoles = guide(
  group(
    guideHolePoints.map(
      ([x, y]) =>
        new paper.Path.Rectangle({
          x: x,
          y: y,
          width: pin.width,
          height: pin.height
        })
      // xy => new paper.Path.Circle({ center: xy, radius: pin.r })
    )
  )
);
const cutHoles = () => cut(guideHoles.clone());

const LAYERS = 20;

const materialPin = (() => {
  const headBase = path.rect({ x: 0, y: 0, width: T, height: T * 3 });
  const headSubtract = new paper.CompoundPath({
    children: [
      path.rect({ x: 0, y: 0, width: T / 2, height: T / 2 }),
      path.rect({ x: 0, y: T * 2.5, width: T / 2, height: T / 2 })
    ]
  });
  const headAdd = new paper.CompoundPath({
    children: [
      new paper.Path.Circle({ x: T / 2, y: T / 2, radius: T / 2 }),
      new paper.Path.Circle({
        x: T / 2,
        y: headBase.height - T / 2,
        radius: T / 2
      })
    ]
  });

  const guideWidth = 5 * T;

  const head = headBase.subtract(headSubtract).unite(headAdd);

  const body = width =>
    path.rect({
      x: T,
      y: T / 2,
      width,
      height: T * 2
    });

  const clip = x =>
    head
      .clone()
      .translate([x, 0])
      .scale(-1, 0.8325);

  const clipSubtract = (() => {
    const sub = path.rect({
      y: T * 1.25,
      width: T * -5,
      height: T / 2
    });

    return width => sub.clone().translate([T + width + T, 0]);
  })();

  guide(
    group(
      head.clone(),
      body(guideWidth).clone(),
      clip(T + guideWidth).clone(),
      clipSubtract(guideWidth)
    ).translate([0, rect.height + T])
  );

  return width => {
    return cut(
      head
        .clone()
        .unite(body(width).clone())
        .unite(clip(T + width).clone())
        .subtract(clipSubtract(width))
    );
  };
})();

cut(materialPin(LAYERS * T).translate([0, rect.height + T * 9]));
cut(materialPin(5 * T).translate([0, rect.height + T * 5]));

const facePlate = (() => {
  const plate = path.rect({
    height: rect.height - 2 * T,
    width: T * LAYERS,
    radius: softCornerRadius
  });

  const cutout = path.rect({
    width: T,
    height: 2 * T
  });

  return plate
    .subtract(cutout.clone().translate([T, 2 * T]))
    .subtract(cutout.clone().translate([plate.width - T - T, 2 * T]))
    .subtract(cutout.clone().translate([T, plate.height - 4 * T]))
    .subtract(
      cutout.clone().translate([plate.width - T - T, plate.height - 4 * T])
    );
})();
cut(facePlate.clone().translate([300, rect.height + T]));

const sliceLabel = guide(new paper.Path([0, 0], [0, T / 2]));

const scoreSliceLabel = n => {
  return null;
  const g = group();
  const point = [T / 1.5, T * 1.5];
  const spread = 360 / n;
  for (let i = 0; i < n; i++) {
    g.addChild(
      sliceLabel
        .clone()
        .translate(point)
        .rotate(i * spread, point)
    );
  }
  return score(g);
};

// edge
// 2 slices
group([
  scoreSliceLabel(1),
  palmFaceWithRoundedCorners(outer().subtract(cut(palmFaceGuide.clone()))),
  //palmPocketGuide.clone(),
  cutButton(),
  cutHoles()
]).translate([100, 0]);

// inner edge
// 2 slices
group([
  scoreSliceLabel(2),
  withFacePlateTabs(outerWithPocketAndFace.clone()),
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
            height: -pin.outer.height
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
