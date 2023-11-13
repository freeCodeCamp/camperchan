import { assert } from "chai";

import { messageCounter } from "../../src/modules/messageCounter";

suite("message counter module", () => {
  test("is defined", () => {
    assert.isDefined(messageCounter);
  });
});
