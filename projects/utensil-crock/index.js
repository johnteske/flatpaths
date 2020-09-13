const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { cut, guide } = require(`${root}/d3/stroke`);

const T = inches(1 / 8);
const WIDTH = inches(6);
const DEPTH = WIDTH;
const HEIGHT = inches(8);

const finger = {
  width: 2 * T,
  height: T
};

module.exports = function generate(d3, g) {
  const distributeX = spacing => selection => {
    const x = selection.data().reduce(
      (acc, cur) => ({
        _pointer: acc._pointer + cur.width + spacing,
        x: [...acc.x, acc._pointer]
      }),
      { _pointer: 0, x: [] }
    ).x;

    selection.each(function(d, i) {
      d3.select(this).attr("transform", `translate(${x[i]}, 0)`);
    });
  };

  const lineGenerator = d3.line();

  // side-end
  const sideEndFingerX = [2 * T, WIDTH / 2 - T, WIDTH - finger.width - 2 * T];

  // side
  const sidePoints = [[0, 0], [WIDTH, 0], [WIDTH, HEIGHT], [0, HEIGHT], [0, 0]];
  // TODO integrate finger joints into path
  // TODO add side finger joints and slots
  const side = g
    .append("g")
    .attr("class", "part")
    .datum({ width: WIDTH });

  side
    .append("path")
    .attr("d", lineGenerator(sidePoints))
    .attr("transform", `translate(0, ${finger.height})`);

  side
    .selectAll(".fingers")
    .data(sideEndFingerX)
    .enter()
    .append("rect")
    .attr("width", finger.width)
    .attr("height", finger.height)
    .attr("x", d => d);

  side.call(cut);

  // end
  // TODO should this have an open top and a closed bottom?
  const endOffset = T * 3;

  const end = g
    .append("g")
    .attr("class", "part")
    .datum({ width: WIDTH });

  // side guide
  end
    .append("rect")
    .attr("width", WIDTH)
    .attr("height", DEPTH)
    .attr("transform", `translate(${T}, ${T})`)
    .call(guide);
  end
    .append("rect")
    .attr("width", WIDTH - T * 2)
    .attr("height", DEPTH - T * 2)
    .attr("transform", `translate(${T * 2}, ${T * 2})`)
    .call(guide);

  end
    .append("rect")
    .attr("width", WIDTH + T * 2)
    .attr("height", DEPTH + T * 2)
    .attr("rx", T)
    .attr("ry", T);
  end
    .append("rect")
    .attr("width", WIDTH - T * 4)
    .attr("height", DEPTH + -T * 4)
    .attr("rx", T)
    .attr("ry", T)
    .attr("transform", `translate(${endOffset}, ${endOffset})`);

  const slots = (selection, angle) => {
    selection
      .selectAll(".fingers")
      .data(sideEndFingerX)
      .enter()
      .append("rect")
      .attr("width", finger.width)
      .attr("height", finger.height)
      .attr("x", d => d + T) // end will overhang by T
      .attr("transform", `rotate(${angle},${T},${T})`);
  };

  end
    .append("g")
    .call(slots, 0)
    .attr("transform", `translate(0, ${T})`);
  end.call(slots, 90); // left
  end
    .append("g")
    .call(slots, 90) // right
    .attr("transform", `translate(${WIDTH - T}, 0)`);
  end
    .append("g")
    .call(slots, 0)
    .attr("transform", `translate(0, ${DEPTH})`);

  end.call(cut);

  g.selectAll(".part").call(distributeX(T));
};
