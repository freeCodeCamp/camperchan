import { describe, assert, test } from "vitest";

import { handleMemberRemove } from "../../../src/events/handlers/handleMemberRemove";

describe("handleMemberRemove", () => {
  test("handleMemberRemove is a function", () => {
    assert.isFunction(handleMemberRemove);
  });
});
