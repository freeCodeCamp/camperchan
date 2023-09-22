import { assert } from "chai";

import { handleMessageDelete } from "../../../src/events/handlers/handleMessageDelete";

suite("handleMessageDelete", () => {
  test("handleMessageDelete is a function", () => {
    assert.isFunction(handleMessageDelete);
  });
});
