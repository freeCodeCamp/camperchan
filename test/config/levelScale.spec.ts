import { describe, assert, test } from "vitest";

import levelScale from "../../src/config/levelScale";

describe("levelScale", () => {
  test("level scale should return the correct values", () => {
    assert.equal(levelScale[0], 0);
    assert.equal(levelScale[1], 100);
    assert.equal(levelScale[2], 300);
    assert.equal(levelScale[50], 127500);
    assert.equal(levelScale[100], 505000);
  });
});
