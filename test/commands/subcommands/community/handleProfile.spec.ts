import { describe, expect, it } from "vitest";
import { handleProfile }
  from "../../../../src/commands/subcommands/community/handleProfile.js";

describe("profile handler", () => {
  it("profile command is defined", () => {
    expect(handleProfile).toBeDefined();
  });
});
