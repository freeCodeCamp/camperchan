import { assert } from "chai";

import LevelModel from "../../src/database/models/LevelModel";

suite("LevelModel", () => {
  test("LevelModel should have the expected properties.", () => {
    const model = new LevelModel({
      userId: "1234567890",
      userTag: "Naomi",
      points: 0,
      level: 0,
      lastSeen: new Date(),
      cooldown: 0,
    });
    assert.property(model, "userId");
    assert.isString(model.userId);
    assert.property(model, "userTag");
    assert.isString(model.userTag);
    assert.property(model, "points");
    assert.isNumber(model.points);
    assert.property(model, "level");
    assert.isNumber(model.level);
    assert.property(model, "lastSeen");
    assert.instanceOf(model.lastSeen, Date);
    assert.property(model, "cooldown");
    assert.isNumber(model.cooldown);
  });
});
