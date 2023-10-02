import { assert } from "chai";

import { handleTruism } from "../../../../src/commands/subcommands/community/handleTruism";

suite("truism handler", () => {
  test("truism command is defined", () => {
    assert.isDefined(handleTruism);
  });
});
