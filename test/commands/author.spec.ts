import { describe, expect, it } from "vitest";
import { author } from "../../src/commands/author.js";

describe("author command", () => {
  it("is defined", () => {
    expect(author).toBeDefined();
  });
});
