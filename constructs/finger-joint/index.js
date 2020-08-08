const root = require("app-root-path");
const paper = require("paper-jsdom");

const fingerJoint = require(`${root}/constructs/finger-joint2`);

paper.project.currentStyle = {
  strokeColor: "#000000"
};

fingerJoint
  .fingerJoint({
    width: 200,
    height: 50,
    n: 7,
    radius: 10
  })
  .a();
