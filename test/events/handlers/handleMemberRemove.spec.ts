import { describe, assert, it } from "vitest";
import { handleMemberRemove }
  from "../../../src/events/handlers/handleMemberRemove.js";

describe("handleMemberRemove", () => {
  it("handleMemberRemove is a function", () => {
    assert.isFunction(handleMemberRemove);
  });
});
