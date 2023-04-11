import { assert } from "chai";

import { leaderboard } from "../../src/commands/leaderboard";

suite("leaderboard command", () => {
  test("leaderboard command is defined", () => {
    assert.isDefined(leaderboard);
  });

  test("leaderboard is a command object", () => {
    assert.isDefined(leaderboard.data);
    assert.isObject(leaderboard.data);
    assert.isDefined(leaderboard.run);
    assert.isFunction(leaderboard.run);
  });

  test("leaderboard command has correct data", () => {
    assert.equal(leaderboard.data.name, "leaderboard");
    assert.equal(leaderboard.data.description, "View the server leaderboard.");
    assert.lengthOf(leaderboard.data.options, 0);
  });
});
