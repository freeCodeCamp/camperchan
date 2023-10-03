import { assert } from "chai";

import { handleRank } from "../../../../src/commands/subcommands/community/handleRank";

suite("rank handler", () => {
  test("rank command is defined", () => {
    assert.isDefined(handleRank);
  });
});
