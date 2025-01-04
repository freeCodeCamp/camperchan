import { describe, expect, it } from "vitest";
import { supporter } from "../../src/commands/supporter.js";

describe("supporter command", () => {
  it("is defined", () => {
    expect(supporter).toBeDefined();
  });
});
