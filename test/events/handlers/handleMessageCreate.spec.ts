import { assert } from "chai";

import { handleMessageCreate } from "../../../src/events/handlers/handleMessageCreate";

suite("handleMessageCreate", () => {
  test("handleMessageCreate is a function", () => {
    assert.isFunction(handleMessageCreate);
  });
});
