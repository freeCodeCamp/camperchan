import { describe, expect, it } from "vitest";
import {
  calculateMilliseconds,
  isValidTimeUnit,
} from "../../src/utils/calculateMilliseconds.js";

describe("calculateMilliseconds", () => {
  it("10 seconds equals 10,000 milliseconds", () => {
    expect(calculateMilliseconds(10, "seconds")).toBe(10_000);
  });

  it("10 minutes equals 60,000 milliseconds", () => {
    expect(calculateMilliseconds(10, "minutes")).toBe(600_000);
  });

  it("10 hours equals 36,000,000 milliseconds", () => {
    expect(calculateMilliseconds(10, "hours")).toBe(36_000_000);
  });

  it("10 days equals 864,000,000 milliseconds", () => {
    expect(calculateMilliseconds(10, "days")).toBe(864_000_000);
  });

  it("10 weeks equals 6,048,000,000 milliseconds", () => {
    expect(calculateMilliseconds(10, "weeks")).toBe(6_048_000_000);
  });

  it("should handle invalid time units", () => {
    // @ts-expect-error intentionally ignoring type for testing
    expect(calculateMilliseconds(10, "invalid")).toBe(0);
  });
});

describe("isValidTimeUnit", () => {
  it("should return true for valid time units", () => {
    expect(isValidTimeUnit("seconds")).toBeTruthy();
  });

  it("should return false for invalid time units", () => {
    expect(isValidTimeUnit("invalid")).toBeFalsy();
  });
});
