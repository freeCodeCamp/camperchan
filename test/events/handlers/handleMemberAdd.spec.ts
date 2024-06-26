import { describe, assert, test } from "vitest";

import { handleMemberAdd } from "../../../src/events/handlers/handleMemberAdd";

describe("handleMemberAdd", () => {
  test("handleMemberAdd is a function", () => {
    assert.isFunction(handleMemberAdd);
  });
});
