import { describe, expect, it } from "vitest";
import { languages } from "../../src/config/languages.js";

describe("languages Config", () => {
  it("should be unique", () => {
    const set = new Set(languages);
    expect(set.size).toBe(languages.length);
  });
});
