import { assert } from "chai";

import { sendModerationDm } from "../../src/modules/sendModerationDm";

suite("sendModerationDm", () => {
  test("sendModerationDm is a function", () => {
    assert.isFunction(sendModerationDm);
  });
});
