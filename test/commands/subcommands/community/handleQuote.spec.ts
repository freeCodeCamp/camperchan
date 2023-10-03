import { assert } from "chai";

import { handleQuote } from "../../../../src/commands/subcommands/community/handleQuote";

suite("quote handler", () => {
  test("is defined", () => {
    assert.isDefined(handleQuote);
  });
});
