import { describe, expect, it } from "vitest";
import { customSubstring } from "../../src/utils/customSubstring.js";

describe("customSubstring", () => {
  it("is defined", () => {
    expect(customSubstring, "customSubstring is not defined").toBeDefined();
    expect(customSubstring, "customSubstring is not a function").toBeTypeOf("function");
  });

  it("returns original string when shorter", () => {
    expect(customSubstring("long", 9)).toBe(9);
    expect(customSubstring("short", 5)).toBe(5);
  });

  it("returns truncated string when longer", () => {
    expect(customSubstring("longer", 2)).toBe("...");
    expect(customSubstring("longer", 5)).toBe("lo...");
  });
});
