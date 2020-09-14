const root = require("app-root-path");
const { inches } = require(`${root}/units`);
const { cut, guide } = require(`${root}/d3/stroke`);

const T = inches(1 / 8);
// TODO testing with smaller dimensions
const WIDTH = inches(4); // inches(6);
const DEPTH = WIDTH;
const HEIGHT = inches(3); // inches(8);

const finger = {
  width: 2 * T,
  height: T
};

// TODO rename/type for array
function rotateLeft(a, d) {
  return [...a.slice(d), ...a.slice(0, d)];
}

// TODO rename/type for point
// TODO the angles here seem off, like they rotate CCW instead of CW
function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;

  return [Math.round(nx), Math.round(ny)]; // TODO this seems very fragile, improve and write tests before making a shared function
  //return [nx, ny];
}

const fingerPath = [
  [0, 0],
  [finger.width, 0],
  [finger.width, finger.height],
  [0, finger.height]
  // [0,0] // do not close path
];

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
      const s = d3.select(this);
      const transform = s.attr("transform") || "";
      s.attr("transform", `${transform} translate(${x[i]}, 0)`);
    });
  };

  const lineGenerator = d3.line();

  // side-end fingers
  const sideEndFingerX = [2 * T, WIDTH / 2 - T, WIDTH - finger.width - 2 * T];
  const sideEndFingerPoints = sideEndFingerX.map(x => [x, -finger.height]);
  const sideEndFinger = rotateLeft(fingerPath, 3);

  // side fingers
  const sideFingerY = [
    T,
    (HEIGHT - finger.width) / 2,
    HEIGHT - finger.width - T
  ];
  const sideFinger = rotateLeft(
    fingerPath.map(p => rotate(0, 0, p[0], p[1], -90)),
    1
  ).reverse();

  const rightSlot = sideFinger.map(([x, y]) => [x + WIDTH, y]);

  // side
  const sidePoints = [
    // top left
    [0, 0],
    // top fingers
    ...sideEndFingerPoints.flatMap(([x, y]) =>
      sideEndFinger.map(([x2, y2]) => [x + x2, y + y2])
    ),
    // top right
    [WIDTH, 0],
    // right slots
    ...sideFingerY.flatMap(y => rightSlot.map(p => [p[0], p[1] + y])),
    // bottom right
    [WIDTH, HEIGHT],
    // bottom left
    [0, HEIGHT],
    // left fingers
    ...sideFingerY
      .flatMap(y => sideFinger.map(p => [p[0], p[1] + y]))
      .reverse(),
    // close path
    [0, 0]
  ];

  // TODO integrate side finger joints into path
  const side = g
    .append("g")
    .attr("class", "part")
    .datum({ width: WIDTH });

  side.append("path").attr("d", lineGenerator(sidePoints));

  //  // top fingers
  //  side
  //    .selectAll(".fingers")
  //    .data(sideEndFingerX)
  //    .enter()
  //    .append("rect")
  //    .attr("width", finger.width)
  //    .attr("height", finger.height)
  //    .attr("x", d => d)
  //    .attr("y", -finger.height)
  //    .call(guide);
  //
  //  // fingers
  //  side
  //    .selectAll(".fingers")
  //    .data(sideFingerY)
  //    .enter()
  //    .append("rect")
  //    .attr("width", finger.height)
  //    .attr("height", finger.width)
  //    .attr("x", -finger.height)
  //    .attr("y", d => d)
  //    .call(guide);

  //  // slots
  //  console.log(
  //    rotateLeft(fingerPath.map(p => rotate(0, 0, p[0], p[1], -90)), 1).reverse()
  //  );
  //
  //  side
  //    .selectAll(".fingers")
  //    .data(sideFingerY)
  //    .enter()
  //    .append("rect")
  //    .attr("width", finger.height)
  //    .attr("height", finger.width)
  //    .attr("y", d => d)
  //    .attr("transform", `translate(${WIDTH - T}, 0)`)
  //    .call(guide);

  side.attr("transform", `translate(${finger.height}, ${finger.height})`);

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

  g.selectAll(".part").call(distributeX(T * 2));
};
