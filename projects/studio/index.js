// default scale = 0.03125
const root = require("app-root-path");

const group = require(`${root}/group`);
const path = require(`${root}/path`);
const { strokeColor } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);

const fixed = strokeColor("#000000");
const movable = strokeColor("#ff00ff");
const soundproofing = strokeColor("#0000ff");

const room = {
  width: inches(96 + 9), // 8'9"
  height: inches(108 + 9) // 9'9"
};

const sink = {
  width: inches(23 + 1 / 2),
  height: inches(23)
};
sink.x = room.width - sink.width;
sink.y = room.height - sink.height;

const door = {
  width: inches(36),
  x: inches(5 + 1 / 2)
};

const heater = {
  width: inches(48), // TODO
  height: inches(3),
  x: inches(26 + 1 / 2) // TODO
};

const win = {
  width: inches(58 + 1 / 2),
  height: inches(5 + 3 / 4),
  x: inches(26 + 1 / 2)
};
win.y = -win.height;

group(
  ...[
    path.rect(room),
    path.rect(sink),
    path.circle({ radius: door.width }).translate(door.x, room.height),
    group(path.rect(heater)),
    path.rect(win)
  ].map(fixed),

  ...[
    // standing desk
    group(
      path
        .rect({
          width: inches(27), // inches(24),
          height: inches(13 + 1 / 2) // inches(12)
        })
        .translate(0, inches(24)),
      // monitor stand
      path.circle({ radius: inches(12) }).translate(inches(27 / 2), inches(12))
    ),

    // short bench
    path
      .rect({
        width: inches(27),
        height: inches(13 + 1 / 2)
      })
      .translate(inches(27), heater.height + inches(6)),

    // glowforge/bench
    path
      .rect({
        width: inches(36),
        height: inches(20.75)
        //height: inches(24)
      })
      .translate(room.width - inches(36), heater.height + inches(6)),

    // bass case
    path
      .rect({
        width: inches(13),
        height: inches(30)
      })
      .translate(0, room.height - door.width - inches(30)),

    // shelf // TODO
    path
      .rect({
        width: inches(12),
        height: inches(48)
      })
      .translate(room.width - inches(12), -inches(24) + room.height / 2)
  ].map(movable),
  // moving blankets for soundproofing
  // https://www.mcmaster.com/moving-blankets/
  // TODO if I account for height of objects, I could add more blankets hanging from the "moulding"
  ...[
    // near desk/bass
    path
      .rect({ width: inches(1 / 4), height: inches(36) })
      .translate(0, inches(24) + inches(13 + 1 / 2)),
    // between door and sink
    // TODO the light switch is here--can it be designed around?
    path
      .rect({ width: inches(36), height: inches(1 / 4) })
      .translate(door.x + door.width, room.height)
  ].map(soundproofing)
).translate(0, win.height);
