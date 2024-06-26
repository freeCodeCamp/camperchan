import { describe, assert, test } from "vitest";

import { Languages } from "../../src/config/Languages.js";

describe("Languages Config", () => {
  test("should be unique", () => {
    const set = new Set(Languages);
    assert.equal(set.size, Languages.length);
  });
});
