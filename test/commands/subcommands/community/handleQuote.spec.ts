import { describe, assert, test } from "vitest";

import { handleQuote } from "../../../../src/commands/subcommands/community/handleQuote";

describe("quote handler", () => {
  test("is defined", () => {
    assert.isDefined(handleQuote);
  });
});
