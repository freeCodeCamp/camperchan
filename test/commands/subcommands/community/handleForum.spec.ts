import { assert } from "chai";

import { handleForum } from "../../../../src/commands/subcommands/community/handleForum";

suite("forum handler", () => {
  test("is defined", () => {
    assert.isDefined(handleForum);
  });
});
