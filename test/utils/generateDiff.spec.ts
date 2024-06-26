import { describe, assert, test } from "vitest";

import { generateDiff } from "../../src/utils/generateDiff";

describe("generateDiff", () => {
  test("is defined", () => {
    assert.isDefined(generateDiff, "generateDiff is not defined");
    assert.isFunction(generateDiff, "generateDiff is not a function");
  });

  test("returns an expected diff string", () => {
    const old = "this is a test";
    const new_ = "this is a test, but different";
    const expected = "- this is a test\n+ this is a test, but different";
    const actual = generateDiff(old, new_);
    assert.equal(actual, expected);
  });
});
