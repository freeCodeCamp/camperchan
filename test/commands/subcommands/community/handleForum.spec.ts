import { describe, expect, it } from "vitest";
import { handleForum }
  from "../../../../src/commands/subcommands/community/handleForum.js";

describe("forum handler", () => {
  it("is defined", () => {
    expect(handleForum).toBeDefined();
  });
});
