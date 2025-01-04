import { describe, expect, it } from "vitest";
import { customSubstring } from "../../src/utils/customSubstring.js";

describe("customSubstring", () => {
  it("is defined", () => {
    expect(customSubstring,"customSubstring is not defined").toBeDefined();
    expect(customSubstring, "customSubstring is not a function").toBeTypeOf("function");
  });

  it("returns original string when shorter", () => {
    assert.equal(customSubstring("long", 9), "long");
    assert.equal(customSubstring("short", 5), "short");
  });

  it("returns truncated string when longer", () => {
    assert.equal(customSubstring("longer", 2), "...");
    assert.equal(customSubstring("longer", 5), "lo...");
  });
});
