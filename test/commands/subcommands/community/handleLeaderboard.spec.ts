import { assert } from "chai";

import { handleLeaderboard } from "../../../../src/commands/subcommands/community/handleLeaderboard";

suite("leaderboard handler", () => {
  test("is defined", () => {
    assert.isDefined(handleLeaderboard);
  });
});
