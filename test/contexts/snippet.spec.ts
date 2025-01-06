import { describe, expect, it } from "vitest";
import { snippet } from "../../src/contexts/snippet.js";

describe("snippet context", () => {
  it("is defined", () => {
    expect(snippet).toBeDefined();
  });
});
