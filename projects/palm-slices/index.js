const paper = require("paper-jsdom");

const path = require("../../path");
const withRoundedCorner = require("../../rounded-corner");
const { cut, score, guide } = require("../../stroke");
const { inches, mm } = require("../../units");

const engrave = o => {
  o.fillColor = "#ffff00";
  return o;
};

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

const fpOut = path.rect({
  x: rect.width,
  width: T2 + T,
  height: T
});

const facePlateTab = pipe()(
  //withRoundedCorner([rect.width + T2 + T / 2, T / 2], T / 2, "ne"),
  //withRoundedCorner([rect.width + T2 + T / 2, T * 2.5], T / 2, "se")
  fpOut
    .unite(
      path.rect({
        x: rect.width + T2,
        width: T,
        height: T * 4
        //height: T * 3
      })
    )
    .unite(
      new paper.Path.Circle({
        radius: T2 * 0.5, // TODO test depth
        center: [rect.width + T, T * 2.5]
      })
    )
);
guide(facePlateTab);
const withFacePlateTabs = target =>
  target
    .unite(facePlateTab.clone().translate([0, T]))
    .unite(facePlateTab.clone().translate([0, rect.height - 4 * T]));

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

  //  const cutout = path.rect({
  //    width: T,
  //    height: palm.button.h
  //  });

  //  guide(path.rect({
  //    height: palm.button.h,
  //    width: palm.button.w
  //  })).translate([palmPocket.x + palmPocket.width / 2, palmPocket.y + palm.button.y])

  return guide(group([cutout])).translate([
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

cut(materialPin(6 * T).translate([0, rect.height + T * 9]));
cut(materialPin(T + cards.w + T).translate([0, rect.height + T * 17]));

const facePlate = (() => {
  const plate = path.rect({
    height: rect.height - 2 * T,
    width: T + T + T, //T + cards.w + T,
    radius: softCornerRadius
  });

  const cutout = path
    .rect({
      width: T,
      height: 3 * T
    })
    .unite(
      path.rect({
        width: T,
        height: T,
        y: 4 * T
      })
    );

  const cutoutPlacement = {
    x1: T,
    x2: plate.width - 2 * T,
    y1: -2 * T,
    y2: plate.height - 5 * T
  };

  return plate
    .subtract(
      cutout.clone().translate([cutoutPlacement.x1, cutoutPlacement.y1])
    )
    .subtract(
      cutout.clone().translate([cutoutPlacement.x2, cutoutPlacement.y1])
    )
    .subtract(
      cutout.clone().translate([cutoutPlacement.x1, cutoutPlacement.y2])
    )
    .subtract(
      cutout.clone().translate([cutoutPlacement.x2, cutoutPlacement.y2])
    );
})();
cut(facePlate.clone().translate([300, rect.height + T]));

const scoreSliceLabel = () => {
  return score(new paper.Path([T, T * 1.5], [rect.width - T, T * 1.5]));
};

// left edge
// 1 slices
group([
  scoreSliceLabel(1),
  palmFaceWithRoundedCorners(outer().subtract(cut(palmFaceGuide.clone()))),
  //palmPocketGuide.clone(),
  cutHoles()
]).translate([100, 0]);

// right edge
// 1 slices
group([
  scoreSliceLabel(1),
  palmFaceWithRoundedCorners(outer().subtract(cut(palmFaceGuide.clone()))),
  //palmPocketGuide.clone(),
  cutButton(),
  engrave(cutButton()),
  cutHoles()
])
  .translate([200, 0])
  .scale(-1, 1);

// inner edge
// 2 slices
group([
  scoreSliceLabel(2),
  withFacePlateTabs(outerWithPocketAndFace.clone()),
  //faceplattabcut
  cut(
    new paper.Path([
      [rect.width + T2 + T / 2, T * 2],
      [rect.width + T2 + T / 2, T * 4]
    ])
  ),
  cut(
    new paper.Path([
      [rect.width + T2 + T / 2, T * 2],
      [rect.width + T2 + T / 2, T * 4]
    ])
  ).translate([0, rect.height - T * 5]),
  cutHoles()
]).translate([300, 0]);

// phone face
// 4 slices
group([
  scoreSliceLabel(3),
  outerWithPocketAndFace.clone(),
  cutHoles()
]).translate([400, 0]);

// with camera
// 4 slices
group([
  scoreSliceLabel(5),
  outerWithPocketAndFace.clone().subtract(cut(cameraCutoutGuide.clone())),
  cutHoles()
]).translate([500, 0]);
