const test = require("tape");

const joint = require("./finger-joint");

test("point function results match expected snapshots", t => {
  t.same(
    joint.fingerPoints(2, 1),
    [[0, 0], [0, -1], [2, -1], [0, -1]],
    "fingerPoints"
  );
  t.same(
    joint.slotPoints(2, 1),
    [[0, 0], [0, -1], [2, -1], [0, -1], [0, 0]],
    "slotPoints"
  );
  t.same(
    joint.fingers(2, 1, 2),
    [[0, 0], [0, -1], [2, -1], [0, -1], [4, 0], [4, -1], [6, -1], [4, -1]],
    "fingers"
  );
  t.end();
});
