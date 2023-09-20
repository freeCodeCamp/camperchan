import { assert } from "chai";

import { handleMemberRemove } from "../../../src/events/handlers/handleMemberRemove";

suite("handleMemberRemove", () => {
  test("handleMemberRemove is a function", () => {
    assert.isFunction(handleMemberRemove);
  });
});
