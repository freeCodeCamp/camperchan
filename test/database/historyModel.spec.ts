import { assert } from "chai";

import HistoryModel from "../../src/database/models/HistoryModel";

suite("HistoryModel", () => {
  test("HistoryModel should have the expected properties.", () => {
    const model = new HistoryModel({
      userId: "1234567890",
      bans: 0,
      kicks: 0,
      mutes: 0,
      warns: 0,
      unbans: 0,
      unmutes: 0,
    });
    assert.property(model, "userId");
    assert.isString(model.userId);
    assert.property(model, "bans");
    assert.isNumber(model.bans);
    assert.property(model, "kicks");
    assert.isNumber(model.kicks);
    assert.property(model, "mutes");
    assert.isNumber(model.mutes);
    assert.property(model, "warns");
    assert.isNumber(model.warns);
    assert.property(model, "unbans");
    assert.isNumber(model.unbans);
    assert.property(model, "unmutes");
  });
});
