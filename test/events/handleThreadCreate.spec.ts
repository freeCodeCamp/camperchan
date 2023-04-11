import { assert } from "chai";

import { handleThreadCreate } from "../../src/events/handlers/handleThreadCreate";

suite("handleThreadCreate", () => {
  test("handleThreadCreate is a function", () => {
    assert.isFunction(handleThreadCreate);
  });
});
