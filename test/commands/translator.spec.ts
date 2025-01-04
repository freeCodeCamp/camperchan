import { describe, expect, it } from "vitest";
import { translator } from "../../src/commands/translator.js";

describe("translator command", () => {
  it("is defined", () => {
    expect(translator).toBeDefined();
  });
});
