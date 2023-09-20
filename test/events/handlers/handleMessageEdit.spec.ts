import { assert } from "chai";

import { handleMessageEdit } from "../../../src/events/handlers/handleMessageEdit";

suite("handleMessageEdit", () => {
  test("handleMessageEdit is a function", () => {
    assert.isFunction(handleMessageEdit);
  });
});
