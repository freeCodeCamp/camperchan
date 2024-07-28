import { describe, assert, test } from "vitest";
import { languages } from "../../src/config/languages.js";

describe("languages Config", () => {
  test("should be unique", () => {
    const set = new Set(languages);
    assert.equal(set.size, languages.length);
  });
});
