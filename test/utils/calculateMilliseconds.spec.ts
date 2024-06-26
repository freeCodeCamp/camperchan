import { describe, assert, test } from "vitest";

import {
  calculateMilliseconds,
  isValidTimeUnit
} from "../../src/utils/calculateMilliseconds.js";

describe("calculateMilliseconds", () => {
  test("10 seconds equals 10,000 milliseconds", () => {
    assert.equal(calculateMilliseconds(10, "seconds"), 10000);
  });

  test("10 minutes equals 60,000 milliseconds", () => {
    assert.equal(calculateMilliseconds(10, "minutes"), 600000);
  });

  test("10 hours equals 36,000,000 milliseconds", () => {
    assert.equal(calculateMilliseconds(10, "hours"), 36000000);
  });

  test("10 days equals 864,000,000 milliseconds", () => {
    assert.equal(calculateMilliseconds(10, "days"), 864000000);
  });

  test("10 weeks equals 6,048,000,000 milliseconds", () => {
    assert.equal(calculateMilliseconds(10, "weeks"), 6048000000);
  });

  test("should handle invalid time units", () => {
    // @ts-expect-error intentionally ignoring type for testing
    assert.equal(calculateMilliseconds(10, "invalid"), 0);
  });
});

describe("isValidTimeUnit", () => {
  test("should return true for valid time units", () => {
    assert.isTrue(isValidTimeUnit("seconds"));
  });

  test("should return false for invalid time units", () => {
    assert.isFalse(isValidTimeUnit("invalid"));
  });
});
