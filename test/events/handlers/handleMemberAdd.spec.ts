import { assert } from "chai";

import { handleMemberAdd } from "../../../src/events/handlers/handleMemberAdd";

suite("handleMemberAdd", () => {
  test("handleMemberAdd is a function", () => {
    assert.isFunction(handleMemberAdd);
  });
});
