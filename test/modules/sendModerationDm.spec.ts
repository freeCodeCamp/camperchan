import { describe, assert, it } from "vitest";
import { sendModerationDm } from "../../src/modules/sendModerationDm.js";

describe("sendModerationDm", () => {
  it("sendModerationDm is a function", () => {
    assert.isFunction(sendModerationDm);
  });
});
