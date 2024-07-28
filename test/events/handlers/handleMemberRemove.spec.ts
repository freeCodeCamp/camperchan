import { describe, assert, test } from "vitest";
import { handleMemberRemove }
  from "../../../src/events/handlers/handleMemberRemove.js";

describe("handleMemberRemove", () => {
  test("handleMemberRemove is a function", () => {
    assert.isFunction(handleMemberRemove);
  });
});
