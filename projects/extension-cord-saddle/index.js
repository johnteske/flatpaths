// v1 bent acrylic (with heat gun)
const root = require("app-root-path");
const paper = require("paper-jsdom");

const path = require(`${root}/path`);
const { cut, score } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);

const T = inches(1 / 8);

const anchor = {
  shaftDiameter: inches(1 / 8) // TODO measure
};

const anchorHole = path
        .circle({ radius: anchor.shaftDiameter / 2 })

const cordConnector = {
  width: inches(1),
  height: inches(7 / 8)
};

const saddleFoot = {
  width: inches(1),
  height: inches(1)
};

const segments =  [
    saddleFoot.width,
    T,
    cordConnector.height,
    T,
    cordConnector.width,
    T,
    cordConnector.height,
    T,
    saddleFoot.width
]

const part = {
  width: segments.reduce((len, w) => len + w, 0),
  height: saddleFoot.height
};

cut(
  path
    .rect(part)
    .subtract(
    anchorHole.clone()
        .translate(saddleFoot.width / 2, saddleFoot.height / 2)
    )
   .subtract(
    anchorHole.clone()
        .translate(part.width - saddleFoot.width / 2, saddleFoot.height / 2)
    )
);

segments.map((w, i) => {
  const x = segments.slice(0,i).reduce((len, w2) => len + w2, 0 )
  return new paper.Path([[x,0],[x, saddleFoot.height]]) 
}).map(score)
