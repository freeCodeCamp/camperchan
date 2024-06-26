import { describe, assert, test } from "vitest";

import { sendModerationDm } from "../../src/modules/sendModerationDm";

describe("sendModerationDm", () => {
  test("sendModerationDm is a function", () => {
    assert.isFunction(sendModerationDm);
  });
});
