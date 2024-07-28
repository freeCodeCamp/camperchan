import { describe, assert, test } from "vitest";
import { send100DaysOfCode } from "../../src/modules/send100DaysOfCode.js";

describe("send100DaysOfCode", () => {
  test("send100DaysOfCode is a function", () => {
    assert.isFunction(send100DaysOfCode);
  });
});
