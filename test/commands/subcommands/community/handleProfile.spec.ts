import { assert } from "chai";

import { handleProfile } from "../../../../src/commands/subcommands/community/handleProfile";

suite("profile handler", () => {
  test("profile command is defined", () => {
    assert.isDefined(handleProfile);
  });
});
