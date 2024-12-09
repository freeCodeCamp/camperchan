import { describe, assert, it } from "vitest";
import { generateDiff } from "../../src/utils/generateDiff.js";

describe("generateDiff", () => {
  it("is defined", () => {
    assert.isDefined(generateDiff, "generateDiff is not defined");
    assert.isFunction(generateDiff, "generateDiff is not a function");
  });

  it("returns an expected diff string", () => {
    const old = "this is a it";
    const updated = "this is a it, but different";
    const expected = "- this is a it\n+ this is a it, but different";
    const actual = generateDiff(old, updated);
    assert.equal(actual, expected);
  });
});
