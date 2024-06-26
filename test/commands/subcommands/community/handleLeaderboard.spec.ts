import { describe, assert, test } from "vitest";

import { handleLeaderboard } from "../../../../src/commands/subcommands/community/handleLeaderboard.js";

describe("leaderboard handler", () => {
  test("is defined", () => {
    assert.isDefined(handleLeaderboard);
  });
});
