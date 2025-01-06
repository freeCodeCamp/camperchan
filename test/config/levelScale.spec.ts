import { describe, expect, it } from "vitest";
import { levelScale } from "../../src/config/levelScale.js";

describe("levelScale", () => {
  it("level scale should return the correct values", () => {
    expect(levelScale[0]).toBe(0);
    expect(levelScale[1]).toBe(100);
    expect(levelScale[2]).toBe(300);
    expect(levelScale[50]).toBe(127_500);
    expect(levelScale[100]).toBe(505_000);
  });
});
