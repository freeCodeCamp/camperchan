import { describe, assert, it } from "vitest";
import { languages } from "../../src/config/languages.js";

describe("languages Config", () => {
  it("should be unique", () => {
    const set = new Set(languages);
    assert.equal(set.size, languages.length);
  });
});
