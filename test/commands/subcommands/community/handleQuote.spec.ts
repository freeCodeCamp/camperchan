import { describe, assert, it } from "vitest";
import { handleQuote }
  from "../../../../src/commands/subcommands/community/handleQuote.js";

describe("quote handler", () => {
  it("is defined", () => {
    assert.isDefined(handleQuote);
  });
});
