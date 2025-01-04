import { describe, expect, it } from "vitest";
import { levelScale } from "../../src/config/levelScale.js";

describe("levelScale", () => {
  it("level scale should return the correct values", () => {
    assert.equal(levelScale[0], 0);
    assert.equal(levelScale[1], 100);
    assert.equal(levelScale[2], 300);
    assert.equal(levelScale[50], 127_500);
    assert.equal(levelScale[100], 505_000);
  });
});
