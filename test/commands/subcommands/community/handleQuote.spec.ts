import { describe, expect, it } from "vitest";
import { handleQuote }
  from "../../../../src/commands/subcommands/community/handleQuote.js";

describe("quote handler", () => {
  it("is defined", () => {
    expect(handleQuote).toBeDefined();
  });
});
