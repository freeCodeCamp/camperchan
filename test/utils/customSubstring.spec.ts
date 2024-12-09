import { describe, assert, it } from "vitest";
import { customSubstring } from "../../src/utils/customSubstring.js";

describe("customSubstring", () => {
  it("is defined", () => {
    assert.isDefined(customSubstring, "customSubstring is not defined");
    assert.isFunction(customSubstring, "customSubstring is not a function");
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
