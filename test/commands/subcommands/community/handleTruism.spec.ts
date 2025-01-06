import { describe, expect, it } from "vitest";
import { handleTruism }
  from "../../../../src/commands/subcommands/community/handleTruism.js";

describe("truism handler", () => {
  it("truism command is defined", () => {
    expect(handleTruism).toBeDefined();
  });
});
