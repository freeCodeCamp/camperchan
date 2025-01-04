import { describe, expect, it } from "vitest";
import { send100DaysOfCode } from "../../src/modules/send100DaysOfCode.js";

describe("send100DaysOfCode", () => {
  it("send100DaysOfCode is a function", () => {
    expect(send100DaysOfCode).toBeTypeOf("function");
  });
});
