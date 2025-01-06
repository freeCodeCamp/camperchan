import { describe, expect, it } from "vitest";
import { sendModerationDm } from "../../src/modules/sendModerationDm.js";

describe("sendModerationDm", () => {
  it("sendModerationDm is a function", () => {
    expect(sendModerationDm).toBeTypeOf("function");
  });
});
