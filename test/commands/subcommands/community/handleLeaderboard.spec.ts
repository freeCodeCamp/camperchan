import { describe, assert, it } from "vitest";
import { handleLeaderboard }
  from "../../../../src/commands/subcommands/community/handleLeaderboard.js";

describe("leaderboard handler", () => {
  it("is defined", () => {
    assert.isDefined(handleLeaderboard);
  });
});
