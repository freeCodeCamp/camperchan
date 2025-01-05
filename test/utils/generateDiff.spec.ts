import { describe, expect, it } from "vitest";
import { generateDiff } from "../../src/utils/generateDiff.js";

describe("generateDiff", () => {
  it("is defined", () => {
    expect(generateDiff,"generateDiff is not defined").toBeDefined();
    expect(generateDiff, "generateDiff is not a function").toBeTypeOf("function");
  });

  it("returns an expected diff string", () => {
    const old = "this is a it";
    const updated = "this is a it, but different";
    const expected = "- this is a it\n+ this is a it, but different";
    const actual = generateDiff(old, updated);
    expect(actual).toBe(expected);
  });
});
